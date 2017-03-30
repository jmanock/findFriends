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
    ~ Need to get rid of that garbage at the end
  */
  var val = req.query.search;
  var url = 'http://flvoters.com/by_address/'+val+'.html';
  console.log(url);
  var address = [];
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var $ = cheerio.load(body);
      $('big b').each(function(i,data){
        var addressList = $(this).text();
        var matches = addressList.replace(/[^A-Za-z]+/g, ' ').trim();
        // Maybe there is a better way to do this
        // Maybe look for end of street name
        var incApt = matches.includes(' APT');
        var incUnit = matches.includes(' UNIT');
        var incSte = matches.includes(' STE');
        var incRm = matches.includes(' RM');
        var incPh = matches.includes(' PH');
        var incBld = matches.includes(' BLDG');
        var incBox = matches.includes(' BOX');

        if(incApt === true || incRm === true || incUnit === true || incSte === true || incPh === true || incBld === true || incBox === true){
          if(incUnit === true){
            newAddress = matches.split('UNIT')[0];
          }else if(incRm === true){
            newAddress = matches.split('RM')[0];
          }else if(incApt === true){
            newAddress = matches.split('APT')[0];
          }else if(incSte === true){
            newAddress = matches.split('STE')[0];
          }else if(incPh === true){
            newAddress = matches.split('PH')[0];
          }else if(incBld === true){
            newAddress = matches.split('BLDG')[0];
          }else{
            newAddress = matches.split('BOX')[0];
          }
          address.push(newAddress.trim())
        }else{
          address.push(matches);
        }
      });
      console.log('AddressLength: ', address.length);
      dups(address);
    }
  });
  function dups(address){
    // This gets rid of dups
    var something =[];
    var unique = address.filter(function(elem, index, self){
      return index == self.indexOf(elem);
    });
    // console.log('dups: ', unique);
    res.send(unique);
  }
});

app.get('/address', function(req,res){
  var val = req.query.search;
  console.log(val);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on 3k '+app.get('port'));
});
