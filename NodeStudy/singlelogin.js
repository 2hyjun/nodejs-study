var fs = require('fs');
var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
	if(req.cookies.auth)
		res.send('<h1>login success</h1>');
	else
		res.redirect('/login');
});

app.get('/login', (req, res) => {
	fs.readFile('login.html', (err, data) => {
		res.send(data.toString());
	});
});

app.post('/login/', (req, res) => {
	var login = req.body.login;
	var password = req.body.password;

	console.log(login, password);
	console.log(req.body);

	if (login == 'rint' && password == '1234') {
		res.cookie('auth', true);
		res.redirect('/');
	}
	else {
		res.write("<script language=\"javascript\">alert('Error')</script>");
		res.write("<script language=\"javascript\">window.location=\"/login\"</script>");
	}
});

app.listen(8124, () => {
	console.log('Server is running at localhost:8124');
})