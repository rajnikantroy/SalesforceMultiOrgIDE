var express = require('express');
var jsforce = require('jsforce');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/View/index.html'));
	logQueryParam(req, res);
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/View/index.html'));
	logQueryParam(req, res);
});

function logQueryParam(req, res){
	if(req.query.instance_url && req.query.access_token){
		console.log('req.query.instance_url : '+ req.query.instance_url);
		console.log('req.query.access_token : '+req.query.access_token);
	}
}

//app.listen(8080);
app.listen(process.env.port || process.env.PORT || 8080);
