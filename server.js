var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://flvoters.com/by_zip.html';
var addons = 'http://flvoters.com/by_address/';
var http = require('http');

request(url, function(error, response, body){
  if(!error && response.statusCode === 200){
    var $ = cheerio.load(body);
    $('a').each(function(i, data){
        var address = $(this).text();
        First(address);
    });
  }
});
function First(address){
  if(address === 'HOME PAGE'){

  }else{
    http.createServer(function(req,res){
      res.writeHead(200, {
        'Content-Type':'text/html'
      });
      res.write('<h1>'+address+'</h1>');
      res.end();
    }).listen(3000);
    console.log('HelloFriend lets see if this works at 3k');
  }
}
