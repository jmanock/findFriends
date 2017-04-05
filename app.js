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
  var fullName = lastName+', '+firstName;
  var namesArray = [];
  var urlArray = [];
  var url = 'https://flvoters.com/by_name/index_pages/'+firstChar+'.html';
  console.log(url);

  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      something(body);
    }
  });// End `request`
  function something(body){
    var $ = cheerio.load(body);
    $('a').each(function(){
      var names = $(this).text();
      names = names.replace(/\r?\n|\r/g,"");
      var links = $(this).attr('href');
      if(names === 'Form N-400' || names === 'Home Page'){

      }else{
        namesArray.push(names);
        urlArray.push(links);
      }
    });
    namesArray.push(fullName);
    namesArray.sort();

    for(var i = 0; i<namesArray.length && i<urlArray.length; i++){
      if(namesArray[i] === fullName){
        kewl(urlArray[i - 1]);
      }
    }// End `For`
  }
  function kewl (x){
    request(x, function(err, response, body){
      console.log(x);
      var something = [];
      var ksomething = [];
      if(!err && response.statusCode === 200){
        var $ = cheerio.load(body);
        $('a').each(function(){
          var knames = $(this).text();
          knames = knames.replace(/\r?\n|\r/g,"");
          var klinks = $(this).attr('href');
          if(knames === 'Form N-400' || knames === 'Home Page'){

          }else{
            something.push(knames);
            ksomething.push(klinks);
          }

        });
        //something.push(fullName);
        //something.sort();
        var moves = [];

        for(var i = 0; i<something.length; i++){
          var space = something[i].indexOf(' ');
          var comma = something[i].indexOf(', ');
          // var kewls = something[i].slice(0,comma);
          // var kewl = something[i].slice(0,space);

          if(space < comma){
            //Add a - should keep them in the same spot
            var x = something[i].replace(' ','-');
            moves.push(x);
          }else{
            moves.push(something[i]);
          }

        }// End `For`
        moves.push(fullName);
        moves.sort();
        for(var j = 0; j<moves.length && j<ksomething.length; j++){
          console.log(moves[j]);
          console.log(ksomething[j]);
        }
      }
    });
  }
});// End `Get`

module.exports = app;
