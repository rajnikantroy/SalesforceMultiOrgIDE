var metadata = require('./nodejs/MetaDataContainer.js');
var express = require('express');
var jsforce = require('jsforce');
var app = express();
var path = require('path');
var sf = require('node-salesforce');
var environments = [];

app.get('/index', function(req, res) {
	console.log('from index');
	getQueryParamsFromMainPage(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));
});

app.get('/list', function(req, res) {
	console.log('from list-compare');
	//CollectQueryParams(req, res);
    res.sendFile(path.join(__dirname + '/View/list-compare.html'));  
});

app.get('/', function(req, res) {
	//console.log('request: '+req.param('abc'));
	//console.log('req.query.instance_url - '+req.query.instance_url);
	getQueryParamsFromMainPage(req, res);
    res.sendFile(path.join(__dirname + '/View/index.html'));	
});

function getQueryParamsFromMainPage(req, res){
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
		QueryAccount(req, res);
		/*storeEnvironmentDetails();
		navigateToWelcomePage();
		var metadata = getParamsFromWelcomePage(req, res);
		*/
	}
}
function getConnection(){
	var latestEnvironment = environments.length;
	var conn = new sf.Connection({
	  instanceUrl : environments[latestEnvironment-1].url,
	  accessToken : environments[latestEnvironment-1].token
	});
	return conn;
}
function navigateToWelcomePage(){
	res.sendFile(path.join(__dirname + '/View/list-compare.html'));
}

function getParamsFromWelcomePage(req, res){
	var mtdata = req.param('selectedMetadata');
	return mtdata;
	
}

function queryMetadata(meta){
	var conn = getConnection();
	return metadata.getMetadata(meta);
}

function QueryAccount(req, res){
	var latestEnvironment = environments.length;
	var conn = new sf.Connection({
	  instanceUrl : environments[latestEnvironment-1].url,
	  accessToken : environments[latestEnvironment-1].token
	});
	
	console.log('environments.length : '+environments.length);
	var records = [];
	//console.log('conn: '+JSON.stringify(conn));
	console.log("conn status: "+conn.status);
	res.sendFile(path.join(__dirname + '/View/list-compare.html'));  
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
app.listen(process.env.port || process.env.PORT || 8080);
