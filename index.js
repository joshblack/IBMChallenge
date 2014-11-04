var express = require('express');
var app = express();
var path = require('path');

// Middleware
app.use('/dist', express.static(__dirname + '/dist'));
app.set('view engine', 'jade');
 
app.get('/', function (req, res) {
    res.render('index.jade');
});

app.listen(3000);