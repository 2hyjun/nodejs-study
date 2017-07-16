var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zk5687',
    database: 'o2'
});

conn.connect();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('HomePage', {
        time: Date(),
        img: 'hsk.gif'
    })
})
app.get('/topic', (req, res) => {
    var sql = 'select * from topic';
    conn.query(sql, (err, totalRows, fields) => {
        if (err)
            console.log(err);
        else {
            if (req.query.id) {
                res.render('topics', {
                    topics: totalRows,
                    corId: parseInt(req.query.id)
                })
            } else {
                //console.log(rows);
                res.render('topics', {
                    topics: totalRows
                });
            }

        }
    })
})
app.get('/topic/new', (req, res) => {
    res.render('new');
})

app.get('/topic/delete', (req, res) => {
    if (req.query.id) {
        var sql = 'delete from topic where id=?';
        var params = [parseInt(req.query.id)];
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                console.log(err)
            else {
                //console.log('Delete', rows);
                res.redirect('/topic');
            }
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/topic/update', (req, res) => {
    if (req.query.id) {
        var sql = 'select * from topic';
        conn.query(sql, (err, rows, fields) => {

            res.render('topics', {
                topics: rows,
                corId: parseInt(req.query.id),
                update: true
            })

        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})
app.post('/topic/update', (req, res) => {
    if (req.query.id) {
        var sql = 'UPDATE topic SET title=?, description=?, author=? where id=?';
        var params = [req.body.title, req.body.description, req.body.author, parseInt(req.query.id)];
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                console.log(err)
            else {
                //console.log('Update', rows);
                res.redirect('/topic?id=' + req.query.id);
            }
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})
app.post('/topic/new', (req, res) => {
    var title = req.body.title;
    var desc = req.body.description;
    var auth = req.body.auth;

    var sql = 'insert into topic (title, description, author) values(?, ?, ?);';
    var params = [title, desc, auth];
    conn.query(sql, params, (err, rows, fields) => {
        if (err)
            console.log(err);
        else {

            //console.log(rows.insertId);
            res.redirect('/topic');
        }
    })
})
app.listen(8124, () => {
    console.log('Server running at port 8124');
})