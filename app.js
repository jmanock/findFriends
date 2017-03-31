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
  var val = req.query.search;
  var url = 'http://flvoters.com/by_address/'+val+'.html';
  var address = [];
  console.log(url);
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var $ = cheerio.load(body);
      $('big b').each(function(i,k){
         var matches = $(this).text();
        /*
          ~ Keep address
          ~ Kill dups of the same address
          ~ Return
        */

        if(matches.includes(' APT')){
          matches = matches.split('APT')[0];
        }else if(matches.includes(' UNIT')){
          matches = matches.split('UNIT')[0];
        }else if(matches.includes(' STE')){
          matches = matches.split('STE')[0];
        }else if(matches.includes(' RM')){
          matches = matches.split('RM')[0];
        }else if(matches.includes(' PH')){
          matches = matches.split('PH')[0];
        }else if(matches.includes(' BLDG')){
          matches = matches.split('BLDG')[0];
        }else if(matches.includes(' BOX')){
          matches = matches.split('BOX')[0];
        }
        address.push(matches);
      });// End  `Each`

      Dups(address);
    }
  });// End `Request`
  function Dups(address){
    var noDups = address.filter(function(elem, index, self){
      return index == self.indexOf(elem);
    });
    console.log(noDups.length);
    res.send(noDups);
  }// End `Dups`
});

module.exports = app;
