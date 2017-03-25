var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.flvoters.com/by_zip.html';

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      $('a').each(function(i, data){
         var address = $(this).text();
         something(address);
      });
    }
  });
  function something(address){
    if(address === 'HOME PAGE'){

    }else{
      var x = [];
      x.push(address);
      res.render('pages/index', {
        address:x
      });
    }
  }
  // var drinks = [
  //   {name:'Blood Mary', drunkness:3},
  //   {name:'Martini', drunkness:5},
  //   {name:'Scotch', drunkness:10}
  // ];
  // var tagline = 'Any code of your own that you have not looked at for six or more months might as well have been written by someone else';

  // res.render('pages/index',{
  //   tagline:address
  // });
});

app.get('/about', function(req, res){
  res.render('pages/about');
});

app.listen(3000);
console.log('3k is where to look');
