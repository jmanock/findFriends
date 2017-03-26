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
  var url = 'http://ww.flvoters.com/by_zip.html';
  console.log(url);
  request(url, function(err, resp, body){
    if(!err && resp.statusCode === 200){
      console.log('HellzYeah');
    }
  })
  res.render('index');
});

app.get('/searching', function(req,res){
  var val = req.query.search;
  /*
    ~ Should show up list of zip codes when typing in
    ~ Send the value back here to get the next page
  */
  if(val.length !== 5){
    console.log('Needs to be a valid zip code');
  }else{
    var url = 'http://www.flvoters.com/by_address/'+val+'.html';
    request(url, function(err, resp, body){
      if(!err && resp.statusCode === 200){
        var $ = cheerio.body;
      }
    });
  }

  // request(url, function(err, resp, body){
  //   body = JSON.parse(body);
  //   if(!body.query.results.RDF.item){
  //     craig = 'No results found. Try again!';
  //   }else{
  //     craig = body.query.results.RDF.item[0]['about'];
  //   }
  //   console.log(craig);
  // });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on 3k '+app.get('port'));
});
