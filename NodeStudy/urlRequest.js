var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req, res) => {
	var pathname = url.parse(req.url).pathname;
	console.log('pathname:', pathname);

	if (pathname == '/') {
		// Reading index.html
		fs.readFile('index.html', (err, data) => {
			res.writeHead(200, { 'ContentType': 'text/html'});
			res.end(data);
		});
	}
	else if (pathname == '/OtherPage') {
		// OtherPage.html
		fs.readFile('OtherPage.html', (err, data) => {
			res.writeHead(200, { 'ContentType' : 'text/html'});
			res.end(data);
				// res.write(data, 'utf8');
				// res.end() 와 같다.	
		})
		
	}
}).listen(8124, () => {
	console.log('Server running at localhost:8124');
})