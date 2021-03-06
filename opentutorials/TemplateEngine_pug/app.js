var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));

app.get('/template', (req, res) => {
    res.render('index', {title: 'Template', body: 'This is Body', location: 'hsk.gif', time: Date()})
})
app.get('/', (req, res) => {
    res.render('hompage', {title: 'HomePage', location: "pairi.jpg"})
})
app.listen(8124, () => {
    console.log('Server running at localhost:8124');
})