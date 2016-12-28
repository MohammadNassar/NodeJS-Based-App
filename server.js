
var express = require('express');
var app = express();
var body_parser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var cookie_parser = require('cookie-parser');
var mongojs = require('mongojs');
var db = mongojs('usersdb', ['usersdb']);

app.use(express.static('public')); // This line allows access to static files, e.g. '/images/bg.png'
app.use(body_parser.urlencoded({ extended : false }));
app.use(body_parser.json());
app.use(multer({ dest : './uploads/' }).array('file'));
//app.use(multer({ dest : './uploads/' }).any());
app.use(cookie_parser());

var url_encoded_parser = body_parser.urlencoded({ extended : false }); // Creating application/x-www-form-urlencoded parser

app.get('/', function (req, res) {
	console.log('Received a GET request to the the homepage');
	res.send('Welcome to my web application!');
});

app.get('/list_user', function(req, res) {
	console.log('Received a GET request to the \'/list_user\'');
	res.send('Page Listing');
});

app.get('/listUsers', function(req, res) {
	fs.readFile(__dirname + '/database/users.json', 'utf8', function(err, data) {
		console.log(data);
		res.end(data);
	});
});

app.get('/allusers', function(req, res) {
	fs.readFile(__dirname + '/database/users.json', 'utf8', function(err, data) {
		console.log('Database records retrieved.');
		res.json(JSON.parse(data));
	});
});

app.get('/mongodblist', function(req, res) {
	db.usersdb.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/mongodblist', function(req, res) {
	console.log(req.body);
	db.usersdb.insert(req.body, function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.get('/ab*cd', function(req, res) {
	console.log('Received a GET request for page/s \'ab*cd\'');
	res.send('Page Pattern Matched (Using a Regular Expression)');
});

app.get('/index', function(req, res) {
	res.sendFile(__dirname + '/index.htm');
});

app.get('/cookies', function(req, res) {
	console.log('Cookies: ', req.cookies);
	res.send('Find cookies in the console!');
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

app.post('/process_form_post', url_encoded_parser, function(req, res) {
	response = {
		first_name : req.body.first_name,
		last_name : req.body.last_name
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

app.post('/file_upload', function(req, res) {
	console.log(req.files.file.name);
	console.log(req.files.file.path);
	console.log(req.files.file.type);
	var file = __dirname + '/' + req.files.file.name;
	
	fs.readFile(req.files.file.path, function(err, data) {
		fs.writeFile(file, data, function(err) {
			if (err)
				console.log(err);
			else {
				response = {
					message : 'File uploaded successfully.',
					filename : req.files.file.name
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});

var user_record = {"user4" : {
		"name" : "Phil",
		"password" : "10",
		"profession" : "Receiptionist",
		"id" : 4
	}
};

app.get('/addUser', function(req, res) {
	var db_file = __dirname + '/database/users.json';
	fs.readFile(db_file, 'utf8', function(err, data) {
		data = JSON.parse(data);
		data["user4"] = user_record["user4"];
		fs.writeFile(db_file, JSON.stringify(data), function(err) {
			if (err)
				console.log(err);
			else {
				response = {
					message : 'Database updates successfully!',
					filename : __dirname + '/database/users.json'
				};
			}
		});
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

app.get('/:id', function(req, res) { // Display a user record by specifying ID in the URL, e.g. http://127.0.0.1:8081/2
	fs.readFile(__dirname + '/database/users.json', 'utf8', function(err, data) {
		var users = JSON.parse(data);
		var user_to_retrieve = users["user" + req.params.id];
		console.log(user_to_retrieve);
		res.end(JSON.stringify(user_to_retrieve));
	});
});

app.get('/deleteUser/:id', function(req, res) { // Delete a record by specifying its ID in the URL, e.g. http://127.0.0.1:8081/deleteUser/3
	var db_file = __dirname + '/database/users.json';
	fs.readFile(db_file, 'utf8', function(err, data) {
		data = JSON.parse(data);
		delete data["user" + req.params.id];
		fs.writeFile(db_file, JSON.stringify(data), function(err) {
			if (err)
				console.log(err);
			else {
				response = {
					message : 'Record deleted successfully.',
					filename : db_file
				};
			}
			console.log(data);
			res.end(JSON.stringify(data));
		});
	});
});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	//console.log("Application listening at: http://%s:%s", host, port);
	console.log("Application listening at: http://127.0.0.1:%s", port);
});