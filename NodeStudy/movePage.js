var http = require('http');

http.createServer((req, res) => {
	res.writeHead(302, { 'Location': 'http://www.pusan.ac.kr'});
	res.end();
}).listen(8124, () => {
	console.log('Server Running at localhost:8124');
});