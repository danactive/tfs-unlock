var exec = require('child_process').exec
	http = require('http'),
	url = require('url'),

	host = "127.0.0.1",
	port = "8080",
	uri = "http://" + host + ":" + port;

http.createServer(function (request, response) {
	var cmd = url.parse(request.url, true).query['cmd'];

	response.writeHead(200, {'Content-Type': 'text/plain'});

	if( cmd ) {
		exec(cmd, function (error, interpreterOutput, interpreterError) {
			response.end('{"interpreterOutput":' + interpreterOutput + ',"interpreterError":"' + interpreterError + '","cmd":"' + cmd + '"}\n');
		});
	} else {
		response.end('Missing cmd.exe query string variable\n');
	}

}).listen(port, host);

console.log('Server running at ' + uri );