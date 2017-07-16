var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Got a Get req');
});

app.post('/', (req, res) => {
    res.send('Got a Post req');
});

app.listen(8124);