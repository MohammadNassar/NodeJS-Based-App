
var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Welcome to my web application!');
});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	//console.log("Application listening at: http://%s:%s", host, port);
	console.log("Application listening at: http://127.0.0.1:%s", port);
});