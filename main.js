
var http = require("http");

http.createServer( function (request, response) {
	
	// Send the HTTP header with status defined as: '200: OK' and content type defined as: 'text/plain'
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.end('Hello World\n');
}).listen(8081);

console.log('Server running at: http:127.0.01:8081/');
