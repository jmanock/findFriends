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
  var url = 'https://flvoters.com/by_name/index_pages/'+firstChar+'.html';
  console.log(url);
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var $ = cheerio.load(body);
      /*
        ~ Get rid of all the junk links
        ~ Search where the last name would go
        ~ Go to that link somehow
        ~ Open last page
        ~ Return names on the list
      */
      $('a').each(function(i,k){
        var names = $(this).text();
        var links = $(this).attr('href');
        if(names === 'Home Page'){
          names = ' ';
        }
        if(names === 'Form N-400'){
          names = ' ';
        }
        console.log(names);
      });
    }
  })// End `Request`
});// End `Get`

module.exports = app;
