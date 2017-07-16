/**
 * http://localhost:8124/
 * http://localhost:8124/template
 * http://localhost:8124/login
 * 위처럼 path에 따라 다른 결과를 출력하는 application을 만들었지만,
 * 같은 path를 주면 항상 똑같은 결과를 출력함.
 * 같은 path도 다른 결과를 출력하도록 할 수 있을 까?
 * ex) http://localhost:8124/login?id=1 <- "URL"
 *                                 ````
 *                             "Query String"
 */

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.pug', {
        numOfContent: 3,
        title: 'Homepage', 
        location: "hsk.gif"})
});
app.get('/content', (req, res) => {
    var contents = ['Javascript', 'NodeJs', 'Express'];

    res.render('content.pug', {
        title: 'content', 
        body: contents[req.query.id] + ' is ..',
        //time: Date(), 
        })
});

app.get('/topic', (req, res) => {
    /**
     * Unsemantic URL
     */
    var topics = [
        'Javascript is..',
        'Express is..',
        'NodeJs is..'
    ];
    if (req.query['id'] !== undefined)
        var output = `
            <a href="/topic?id=0">JavaScript</a><br>
            <a href="/topic?id=1">Express</a><br>
            <a href="/topic?id=2">NodeJs</a><br><br>
            ${topics[req.query.id]}
        `;
    else {
        var output = `
            <a href="/topic?id=0">JavaScript</a><br>
            <a href="/topic?id=1">Express</a><br>
            <a href="/topic?id=2">NodeJs</a><br><br>
        `;
    }

    res.send(output);
})
app.get('/topicsemantic/:id', (req, res) => {
    /**
     * semantic URL
     */
    var topics = [
        'Javascript is..',
        'Express is..',
        'NodeJs is..'
    ];
    if (req.params.id !== undefined)
        var output = `
            <a href="/topicsemantic/0">JavaScript</a><br>
            <a href="/topicsemantic/1">Express</a><br>
            <a href="/topicsemantic/2">NodeJs</a><br><br>
            ${topics[req.params.id]}
        `;
    else {
        var output = `
            <a href="/topicsemantic/0">JavaScript</a><br>
            <a href="/topicsemantic/1">Express</a><br>
            <a href="/topicsemantic/2">NodeJs</a><br><br>
        `;
    }

    res.send(output);
})

app.get('/topicsemantic/:id&:mode', (req, res) => {
    res.send(req.params.id + ', ' + req.params.mode);
})

app.listen(8124, () => {
    console.log('Server running at localhost:8124');
})