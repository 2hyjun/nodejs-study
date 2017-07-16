var http = require('http');
//http module
var fs = require('fs');
// file system module

http.createServer(function(req, res) {
	fs.readFile('hello.js', 'utf8', function(err, data) {
		console.log('called!!\n');
		res.writeHead(200, {'content-type': 'text/plain'});

		if (err) 
			res.write('could not find or open file for reading\n');
		else
			res.write(data);

		//end of response
		res.end();
	});
}).listen(8124, function() {console.log('bound to port 8124')});

console.log('server running on 8124');