var express = require('express');

var app = express();

/*
* use : set 'middleware'
* so what is 'middleware?'
* 요청의 응답을 완료하기 전까지 요청 중간중간에
* 여러가지 일을 처리하기 위해서 작성하는 것.
*/

app.use((req, res, next) => {
	if (req.url === '/favicon.ico')
		return;
	console.log('first middle ware!');
	res.writeHead(200, {'ContentType': 'text/html'});
	res.write('<h1>express basic1</h1>');	
	next();
});

app.use((req, res, next) => {
	console.log('second middle ware!');
	
	res.write('<h1>express basic2</h1>');	
	next();
});

app.use((req, res, next) => {
	console.log('third middle ware!');


	res.end('<h1>express basic3</h1>');	
});

app.listen(8124, () => {
	console.log('Server running at localhost:8124');
})