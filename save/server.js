var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://flvoters.com/by_zip.html';
var addons = 'http://flvoters.com/by_address/';


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
    console.log('{zip:'+address+'},');
  }
}
