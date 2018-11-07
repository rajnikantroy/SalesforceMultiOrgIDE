var express = require('express');
var jsforce = require('jsforce');
var app = express();
var path = require('path');
var sf = require('node-salesforce');

// viewed at http://localhost:8080
app.get('/index', function(req, res) {
	console.log('from index');
	//logQueryParam(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));
});

app.get('/', function(req, res) {
	console.log('request: '+req.param('abc'));
	//console.log('req.query.instance_url - '+req.query.instance_url);
	logQueryParam(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));	
});

function logQueryParam(req, res){
	if(req.query.instance_url && req.query.access_token){
		console.log('req.query.instance_url : '+ req.query.instance_url);
		console.log('req.query.access_token : '+req.query.access_token);
		console.log('req.query.token_type : '+req.query.token_type);
		loginSalesforce(req.query.instance_url, req.query.access_token);
	}
}
function loginSalesforce(url, token){
	var conn = new sf.Connection({
	  instanceUrl : url,
	  accessToken : token
	});
	var records = [];
	conn.query("SELECT Id, Name FROM Account", function(err, result) {
	  if (err) { return console.error(err); }
	  console.log("total : " + result.totalSize);
	  console.log("fetched : " + result.records.length);
	});
}
//app.listen(8080);
app.listen(process.env.port || process.env.PORT || 8080);
