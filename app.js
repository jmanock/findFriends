var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

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
  /*
    ~ Look up ZipCode
    ~ Return List of Address
    PART 3
    ~ Click Address
    ~ Return list of People
    PART 4
    ~ Able to click on people for google search
    ~ Maybe show a map
    ~ Highlight sex offenders
    STRECH
    ~ Look up crimanil record
  */
  var val = req.query.search;
  var url = 'http://flvoters.com/by_address/'+val+'.html';
  console.log(url);
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var $ = cheerio.load(body);
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on 3k '+app.get('port'));
});
