var express = require('express');

var app = express();

app.get('/page/:id', (req, res) => {
	var name = req.params.id;
	res.send('<h1>' + name + ' Page</h1>');
});
app.all('*', (req, res) => {
	res.status(404).send('<h1>404 ERROR - Page Not Founded</h1>' + '<h3>Proper Usage: \"localhost:8124/page/id\"</h3>');	
});
app.listen(8124, () => {
	console.log('Server running at localhost:8124');
})

//What is RESTful??