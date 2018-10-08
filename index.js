var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/View/index.html'));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/View/index.html'));
});

//app.listen(8080);
app.listen(process.env.port || process.env.PORT || 8080);
