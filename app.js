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

app.get('/searching', function(req,res){
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var firstChar = req.query.firstChar;
  var fullName = lastName + ', '+firstName;
  var url = 'https://flvoters.com/by_name/index_pages/'+firstChar+'.html';

  Request(url);

  function Request(url){
    console.log(url);
    request(url, function(err, response, body){
      if(!err && response.statusCode === 200){
        Pages(body);
      }
    });
  }// End `Request`

  function Pages(body){
    var namesArray = [];
    var urlArray = [];
    var $ = cheerio.load(body);
    $('a').each(function(){
      var names = $(this).text();
      var links = $(this).attr('href');
      names = names.replace(/\r?\n|r/g,'');
      var space = names.indexOf(' ');
      var comma = names.indexOf(', ');

      if(names === 'Form N-400' || names === 'Home Page' || names === 'Fom N-400'){

      }else if(space < comma){
        //names = names.replace(' ', '-');
        namesArray.push(names);
        urlArray.push(links);
      }else{
        namesArray.push(names);
        urlArray.push(links);
      }
    });// End `each`

    if(namesArray.length < 199){
      namesArray.push(fullName);
      namesArray.sort();
      FindUrl(namesArray, urlArray);
    }else{
      namesArray.push(fullName);
      // namesArray.sort();
      LastPage(namesArray, urlArray);
    }
  }// End `Pages`

  function FindUrl(namesArray, urlArray){
    for(var i = 0; i<namesArray.length && urlArray.length; i++){
      if(namesArray[i] === fullName){
        var nextPage = urlArray[i-1];
        Request(nextPage);
      }
    }
  }// End `FindUrl`

  function LastPage(namesArray, urlArray){
    for(var i = 0; i<namesArray.length && i<urlArray.length; i++){
      var url = urlArray[i];
      something(url);
    }
  }// End `LastPage`

  function something(url){
    request(url, function(err, response, body){
      if(!err && response.statusCode === 200){
        console.log(url);
        var $ = cheerio.load(body);
        $('a').each(function(){
          var names = $(this).text();
          if(names == 'eVerify Full Repoer' || names === 'Previous page' || names === 'Home page' || names === 'Next page'){

          }else{
            names = names.slice(27).toUpperCase();
            var knames = firstName+' '+lastName;
            console.log(knames);
            console.log(names);
            if(knames === names){
              console.log('Found the fucking name');
            }
          }
        });
      }
    });
  }
});// End `Get Searching`

module.exports = app;
