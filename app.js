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

   Request(url);

   function Request(url){
     console.log(url);
     request(url, function(err, response, body){
       if(!err && response.statusCode === 200){
         Pages(body);
       }
     });// End `request`
   }// End `Request`

   function Pages(body){
      var $ = cheerio.load(body);
      urlArray = [];
      namesArray = [];
      $('a').each(function(){
        var names = $(this).text();
        var links = $(this).attr('href');
        names = names.replace(/\r?\n|r/g,'');
        var space = names.indexOf(' ');
        var comma = names.indexOf(', ');

        if(names === 'Form N-400' || names === 'Home Page' || names === 'Fom N-400'){
          //console.log(names);
        }else if(space < comma){
          names = names.replace(' ', '-');
          namesArray.push(names);
          urlArray.push(links);
        }else{
          namesArray.push(names);
          urlArray.push(links);
        }
      });// End `each`

      if(namesArray.length > 300){
          //LastPage(namesArray, urlArray);
          tests(namesArray, urlArray);
      }else{
        namesArray.push(fullName);
        namesArray.sort();
        FindUrl(namesArray, urlArray);
      }
   }// End `Pages Function`

  function FindUrl(namesArray, urlArray){
    for(var i = 0; i<namesArray.length && urlArray.length; i++){
      if(namesArray[i] === fullName){
        var nextPage = urlArray[i-1];
        if(namesArray.length < 200){
          Request(nextPage);
        }else{
          FinalPage(nextPage);
        }
      }
    }// End `For Loop`
  }// End `Find Url Function`

   function LastPage(namesArray, urlArray){
     var something = [];
     for(var i = 0; i<namesArray.length && i<urlArray.length; i++){
        var names = namesArray[i];
        if(names === 'eVeify Full Repot' || names === 'Pevious page' || names === 'Home page' || names === 'Next page'){

        }else{
          names = names.slice(25);
          names = names.toUpperCase();
          fName = firstName + ' '+lastName;
          if(names.includes(firstName)){
            // Send Names back
            console.log(names);

          }
        }
     }// End `For`
   }// End `Last Page Function`

   function FinalPage(url){
     var voterIdNumberArray = [];
     var namesArray = [];
     request(url, function(err, response, body){
       if(!err && response.statusCode === 200){
         var $ = cheerio.load(body);

         $('font a').each(function(){
           var names = $(this).text();

            if(names !== 'eVerify Full Report'){
              if(names !== 'Home page'){
                if(names !== 'Previous page'){
                  if(names !== 'Next page'){
                    names = names.slice(27);
                    names = names.toUpperCase();
                    namesArray.push(names);
                  }
                }
              }
            }
           var voterIdNumber = $(this).attr('target');
           if(voterIdNumber !== undefined){
             voterIdNumberArray.push(voterIdNumber);
           }
         });// End `Each`
       }

      for(var i = 0; i<voterIdNumberArray.length && i<namesArray.length; i++){
        var fname = firstName +' '+lastName;
        if(namesArray[i].includes(firstName)){
          var voterId = voterIdNumberArray[i];
          var texts = $('td').text();
          if(texts.includes(voterId) && texts.includes(lastName +', '+firstName)){

            var something = $(body).html();
            //var x = /voterId/.exec(something);
            var re = new RegExp(voterId,'g');
            console.log(re.exec(something));
          }// End `If`

        }
      }
     });// End `request`

   }// End `Final Page Function`

});// End `Get`

module.exports = app;
