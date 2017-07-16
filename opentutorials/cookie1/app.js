var express = require('express')
var app = express();

app.locals.pretty = true;
app.set('view engine', 'pug')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));

var cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use(express.static('public'));
app.get('/clear', (req, res) => {
    res.cookie('count', 0);
    res.redirect('/count');
})

app.use((req, res, next) => {
    if (req.origianalUrl === '/favicon.ico') {
        console.log(req.originalURL);
        res.redirect('/error');
    }
    next();
})
app.get('/count', (req, res) => {
    
    if (req.originalUrl === '/favicon.ico') {
        console.log(req.originalUrl);
        res.status(204).send('fuck you favicon')
    }
        
    var cnt = parseInt(req.cookies.count);
    cnt ? cnt++ : cnt = 0;
    res.cookie('count', ++cnt);
    res.send('<p>count: ' + cnt + '</p><p><a href="/clear">clear cookie</a></p>');
})

app.get('/error', (req, res) => {
    res.send('<p><h1>404</h1></p>')
})

// app.get('/favicon.ico', (req, res) => {
//     res.status(204);
// })

app.listen(8124, () => {
    console.log('Server Running at port 8124');
})