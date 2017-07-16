var express = require('express');

var app = express();
var router = express.Router();

app.use('/a', require('./routerA').router);


app.use('/b', require('./routerB').router);
app.use('/c', require('./routerC').router);

app.all('*', (req, res) => {
	res.status(404).send('<h1>404 ERROR - Page Not Founded</h1>');	
});

app.listen(8124, () => {
	console.log("Server is running at localhost: 8124");
});