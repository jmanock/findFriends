var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('pages/index');
});

app.get('/about', function(req, res){
  res.render('pages/about');
});

app.listen(3000);
console.log('3k is where to look');
