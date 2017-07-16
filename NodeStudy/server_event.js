var http = require('http');
var server = http.createServer();

server.on('request', (code) => {
	console.log('Request On');
})

server.on('connection', (code) => {
	console.log('Connection On');
})

server.on('close', (code) => {
	console.log('Close On');
})

server.listen(8124);