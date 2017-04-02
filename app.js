var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

/*
  ~ Split the name into first and last
  ~ Load the url
  ~ Request to the search
*/
app.get('/searching', function(req,res){
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var firstChar = req.query.firstChar;
  var namesArray = [];
  var urlArray = [];
  //something.push(lastName);
  var url = 'https://flvoters.com/by_name/index_pages/'+firstChar+'.html';
  console.log(url);
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var $ = cheerio.load(body);

      $('a').each(function(i,k){
        var names = $(this).text();
        names = names.replace(/\r?\n|\r/g,"");
         links = $(this).attr('href');
        if(names === 'Home Page'){
          names = '';
          links = '';
        }
        if(names === 'Form N-400'){
          names = '';
          links = '';
        }
        namesArray.push(names);
        urlArray.push(links);
      });// End  `Each`
      namesArray.push(lastName);
      namesArray = namesArray.filter(Boolean);
      namesArray.sort();
      urlArray = urlArray.filter(Boolean);
      Next(namesArray, urlArray);
    }
  });// End `Request`
  function Next(namesArray, urlArray){
    var something = [];
    var somethingElse = [];
    for(var i = 0; i<namesArray.length && i<urlArray.length; i++){
      if(namesArray[i] === lastName){
        call = namesArray.indexOf(lastName);
        call = urlArray[call - 1];
      }
    }
    request(call, function(err, response, body){
      if(!err && response.statusCode === 200){
        var $ = cheerio.load(body);
        $('a').each(function(i,k){
           knames = $(this).text();
           kurls = $(this).attr('href');
          knames = knames.replace(/\r?\n|\r/g,"");
          something.push(knames);
        });//End `Each`
        something.push(lastName);
        something.sort();
      }
      kNext(knames, kurls);
    });// End `Request`
  }// End `Next Function`
  function kNext(knames, kurls){
    console.log(knames);
  }
});// End `Get`

module.exports = app;
