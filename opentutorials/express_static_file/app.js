var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('<fieldset><h1>Hello~</h1></fieldset>');
})

app.get('/login', (req, res) => {
    res.send('<h1>Login Please..</h1>');
})

app.get('/route', (req, res) => {
    res.send('hello Router, <img src="hsk.gif"/>')
})

app.listen(3000, () => {
    console.log('Sever is running at port 3000');
})