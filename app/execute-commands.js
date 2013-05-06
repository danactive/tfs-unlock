var exec = require('child_process').exec
	http = require('http'),
	url = require('url'),

	host = "127.0.0.1",
	port = "8080",
	uri = "http://" + host + ":" + port;

	var querystring = require('querystring');
var utils = require('util');

http.createServer(function (request, response) {
	//var cmd = url.parse(request.url, true).query['cmd'];

	if (request.method == 'POST') {
		console.log("[200] " + request.method + " to " + request.url);
		var fullBody = '';

		request.on('data', function(chunk) {
			// append the current chunk of data to the fullBody variable
			fullBody += chunk.toString();
		});

		request.on('end', function() {
			// request ended -> do something with the data
			response.writeHead(200, "OK", {'Content-Type': 'application/json'});

			// parse the received body data
			var decodedBody = querystring.parse(fullBody);

			// output the decoded data to the HTTP response          
			response.write(JSON.stringify({"hello": 'world'}));
			//response.write(utils.inspect(decodedBody));

			response.end();
		});
	} else {
		console.log("[405] " + request.method + " to " + request.url);
		response.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
		response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
	}
/*
	response.writeHead(200, {'Content-Type': 'text/plain'});

	if( cmd ) {
		exec(cmd, function (error, interpreterOutput, interpreterError) {
			response.end('{"interpreterOutput":' + interpreterOutput + ',"interpreterError":"' + interpreterError + '","cmd":"' + cmd + '"}\n');
		});
	} else {
		response.end('Missing cmd.exe query string variable\n');
	}
*/
}).listen(port, host);

console.log('Server running at ' + uri );