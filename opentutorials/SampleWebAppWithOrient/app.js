var OrientDB = require('orientjs');
var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'zk5687'
})

var db = server.use('o2');
var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.pretty = true;
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('HomePage', {
        time: Date(),
        img: 'hsk.gif'
    });
})

app.get('/topic', (req, res) => {

    var sql = 'select from topic'
    db.query(sql).then((totalTopics) => {
        res.render('Topic', {
            topics: totalTopics,
            rid: req.query.rid
        })
    })
})
app.get('/topic/new', (req, res) => {
    res.render('newTopic');
})
app.post('/topic/new', (req, res) => {
    var sql = 'INSERT INTO topic (title, description) VALUES(:title, :description)';
    var param = {
        params: {
            title: req.body.title,
            description: req.body.description
        }
    }
    db.query(sql, param).then((result) => {
        res.redirect('/topic')
    })
})
app.get('/topic/update', (req, res) => {
    if (req.query.rid) {
        var sql = 'select from topic'
        db.query(sql).then((totalTopics) => {
            res.render('Topic', {
                topics: totalTopics,
                rid: req.query.rid,
                update: true
            })
        })
    } else
        res.status(500).send('Internal Server Error');

})

app.post('/topic/update', (req, res) => {
    if (req.query.rid) {
        var sql = 'update topic set title=:title, description=:desc where @rid=:rid;'
        var param = {
            params: {
                title: req.body.title,
                desc: req.body.description,
                rid: req.query.rid
            }
        }
        db.query(sql, param).then((result) => {
            console.log('Update', result)
            res.redirect('/topic')
        })

    } else
        res.status(500).send('Internal Server Error');
})
app.get('/topic/delete', (req, res) => {
    if (req.query.rid) {
        var sql = 'DELETE FROM topic WHERE @rid=:rid';
        db.query(sql, {
            params: {
                rid: req.query.rid
            }
        }).then((result) => {
            console.log('Delete', result);
            res.redirect('/topic')
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})

app.listen(8124, () => {
    console.log('Server running at port 8124')
})