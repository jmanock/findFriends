var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if('development' === app.get('env')){
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
  res.render('index');
});

app.get('/searching', function(req,res){
  // res.send('Whee');
  var val = req.query.search;
  if(val.indexOf(' ')>= 0){
    val = val.split(' ').join('+');
  }
   console.log(val);

  var url = 'http://www.imdb.com/find?ref_=nv_sr_fn&q='+val+'&s=all';
  console.log(url);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on 3k '+app.get('port'));
});
