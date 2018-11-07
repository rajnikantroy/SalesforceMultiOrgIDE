var express = require('express');
var jsforce = require('jsforce');
var app = express();
var path = require('path');
var sf = require('node-salesforce');
var environments = [];

// viewed at http://localhost:8080
app.get('/index', function(req, res) {
	console.log('from index');
	//salesforceParams(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));
});

app.get('/', function(req, res) {
	console.log('request: '+req.param('abc'));
	//console.log('req.query.instance_url - '+req.query.instance_url);
	salesforceParams(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));	
});

function salesforceParams(req, res){
	if(req.query.instance_url && req.query.access_token){
		console.log('req.query.instance_url : '+ req.query.instance_url);
		console.log('req.query.access_token : '+req.query.access_token);
		console.log('req.query.token_type : '+req.query.token_type);
		var environment = {};
		environment.url = req.query.instance_url;
		environment.token = req.query.access_token;
		environment.token_type = req.query.token_type;
		environment.scope = req.query.scope;
		environments.push(environment);
		//QueryAccount(req.query.instance_url, req.query.access_token);
		QueryAccount();
	}
}
function QueryAccount(){
	var conn = new sf.Connection({
	  instanceUrl : environments[0].url,
	  accessToken : environments[0].token
	});
	console.log('environments.length : '+environments.length);
	var records = [];
	conn.query("SELECT Id, Name FROM ApexClass limit 10", function(err, result) {
	  if (err) { return console.error(err); }
	  console.log("total : " + result.totalSize);
	  console.log("fetched : " + result.records.length);
	  for(var i=0; i<result.records.length; i++){
			console.log(result.records[i].Name);
	  }
	});
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
	  for(var i=0; i<result.records.length; i++){
			console.log(result.records[0].Name);
	  }
	});
	
}
//app.listen(8080);
app.listen(process.env.port || process.env.PORT || 8080);
