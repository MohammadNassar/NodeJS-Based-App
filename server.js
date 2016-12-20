
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	console.log('Received a GET request to the the homepage');
	res.send('Welcome to my web application!');
});

app.get('/list_user', function(req, res) {
	console.log('Received a GET request to the \'/list_user\'');
	res.send('Page Listing');
});

app.get('/ab*cd', function(req, res) {
	console.log('Received a GET request for page/s \'ab*cd\'');
	res.send('Page Pattern Matched (Using a Regular Expression)');
});

// The following line allows access to static files, e.g. '/images/bg.png'
app.use(express.static('public'));

app.get('/index', function(req, res) {
	res.sendFile(__dirname + '/index.htm');
});

app.get('/process_form_get', function(req, res) {
	// Create a response in JSON format
	response = {
		first_name : req.query.first_name,
		last_name : req.query.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	//console.log("Application listening at: http://%s:%s", host, port);
	console.log("Application listening at: http://127.0.0.1:%s", port);
});