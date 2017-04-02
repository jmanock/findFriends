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
  var url = 'https://flvoters.com/by_name/index_pages/'+firstChar+'.html';
  console.log(url);
  /*
    ~ Need a request function for names and urls
    ~ Need a sort function to get new url
  */
  Request(url);
  function Request(url){
    request(url, function(err, response, body){
      if(!err && response.statusCode === 200){
        var $ = cheerio.load(body);
        $('a').each(function(i,k){
          names = $(this).text();
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
        });// End `Each`
        namesArray.push(lastName);
        Next(namesArray, urlArray);
      }
    });// End `Request`
  }// End `Request Function`
  function Next(namesArray, urlArray){
    namesArray = namesArray.filter(Boolean);
    namesArray.sort();
    for(var i = 0; i<namesArray.length && i<urlArray.length; i++){
      if(namesArray[i] === lastName){
        call = namesArray.indexOf(lastName);
        call = urlArray[call];
        console.log(call);
      }
    }// End `For`

  //  Request(call);
  }// End `Next Function`
});// End `Get`

module.exports = app;
