
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

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	//console.log("Application listening at: http://%s:%s", host, port);
	console.log("Application listening at: http://127.0.0.1:%s", port);
});