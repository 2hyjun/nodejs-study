var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.pretty = true;
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('homepage', {
        time: Date(),
        img: 'hsk.gif'
    });
});

app.get(['/topic', '/topic/new'], (req, res) => {
    console.log(req.path)
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        if (req.path == '/topic') {
            if (req.query.title === undefined)
                res.render('topics', {
                    topics: files,
                    title: undefined,
                    description: undefined,
                    newTopic: false,
                });
            else
                fs.readFile('data/' + req.query.title, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Internal Server Error");
                    } else {
                        res.render('topics', {
                            topics: files,
                            title: req.query.title,
                            description: data,
                            newTopic: false
                        })
                    }
                })
        } else if (req.path == '/topic/new'){
            res.render('topics', {
                topics: files,
                title: undefined,
                description: undefined,
                newTopic: true
            });
        }
    })

})

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var des = req.body.description;

    fs.writeFile('./data/' + title, des, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            throw err;
        }

        console.log(title, des, "saved!");
        res.redirect('/topic');
    });

})
app.listen(8124, () => {
    console.log("Server running at port 8124");
})