var express = require('express');
var app = express();
var path = require('path');

// Middleware
app.use('/dist', express.static(__dirname + '/dist'));
app.set('view engine', 'jade');
 
app.get('/', function (req, res) {
    res.render('index.jade');
});

app.get('/about', function(req, res) {
    res.render('about.jade');
});

app.get('/register', function(req, res) {
    res.render('register.jade');
});

app.get('/gym', function(req, res) {
    res.render('gym.jade');
});

app.set('port', (process.env.PORT || 3000))

console.log('Currently running at: http://localhost:3000');
app.listen(app.get('port'));