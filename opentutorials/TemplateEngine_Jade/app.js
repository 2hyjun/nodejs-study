var express = require('express');
var app = express();
// npm install pug -- save

// static file setup
app.use(express.static('public'));

// view engine setup
app.set('view engine', 'pug');


app.get('/template', (req, res) => {
    res.render('index');
})
app.get('/', (req, res) => {
    res.send('<div class="container"><fieldset><h1>Hello, HomePage!</h1><img src="hsk.gif"</fieldset></div>');
})


app.listen(3000, () => {
    console.log('Server is running at port 3000');
})