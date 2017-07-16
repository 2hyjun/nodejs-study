var express = require('express');

var app = express();
var port = 8124;
app.get('/', (req, res) => {
    res.send('Hello World!');
}).all('*', (req, res) => {
    res.status(404).send('<h1>ERROR 404 - NOT FOUNDED</h1>')
})
.listen(port, () => {
    console.log('Example app listening on port', port);
})