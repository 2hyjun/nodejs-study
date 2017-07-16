var express = require('express')
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session)
var mysql = require('mysql');
var crypto = require('crypto');

var bodyParser = require('body-parser');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zk5687',
    database: 'o2'
});
var salt = 'fuckyouhackerthisissaltforyou';
conn.connect();

var options = {
    host: 'localhost',
    port: 3306, // 기본
    user: 'root',
    password: 'zk5687',
    database: 'o2'
    // mysql 접속 정보.
    // session에서 만 사용.
}
app.locals.pretty = true;
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'asdv8176U3rtyS6f$#684BVFdhbv',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(options)
}))

app.get('/', (req, res) => {
    var output = `
         <p><a href='/count'>Count Application</a></p>
         <p><a href='/mypage'>My Page</a></p>
    `
    res.send(output);
})

app.get('/mypage', (req, res) => {
    if (req.session.signedId) {
        console.log(req.session.signedId);
        var sql = 'SELECT * FROM user WHERE user_id=?;';
        var params = [req.session.signedId];
        conn.query(sql, params, (err, rows, fields) => {
            console.log(rows);
            console.log(rows[0]);
            var name = rows[0].user_name;
            var birthDay = rows[0].user_birth_day;
            var output = `
            <h1>Welcome, ${req.session.signedId}</h1><br>
            Name: ${name}<br>
            Your BirthDay: ${birthDay}<br>
            <a href='/mypage/logout'>logout</a>
            `;
            res.send(output)
        })

    } else {
        res.redirect('/mypage/login');
    }
})
app.get('/mypage/logout', (req, res) => {
    delete req.session.signedId;
    res.redirect('/mypage');
})
app.get('/mypage/login', (req, res) => {
    res.render('login')
})

app.post('/mypage/login', (req, res) => {
    if (req.body.id && req.body.password) {
        var sql = 'SELECT * FROM user;';
        conn.query(sql, (err, rows, fields) => {
            //console.log(rows);
            var idFounded;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].user_id === req.body.id) {
                    idFounded = rows[i];
                }
            }
            if (idFounded) {
                crypto.pbkdf2(req.body.password, salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                    //console.log(idFounded.user_pw);
                    // console.log(key.toString('base64'));
                    if (key.toString('base64') === idFounded.user_pw) {
                        req.session.signedId = req.body.id;
                        res.redirect('/mypage');
                    } else {
                        res.write(`<script language=javascript>alert('Wrong ID & Password')</script>`);
                        res.write(`<script language=javascript>window.location='/mypage/login'</script>`);
                    }
                })
            } else {
                res.write(`<script language=javascript>alert('Wrong ID & Password')</script>`);
                res.write(`<script language=javascript>window.location='/mypage/login'</script>`);
            }
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})
app.get('/signin', (req, res) => {
    res.render('signin');
})

app.post('/signin', (req, res) => {
    if (req.body.id && req.body.password && req.body.name && req.body.birth) {

        crypto.pbkdf2(req.body.password, salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
            var sql = 'INSERT INTO user (user_id, user_pw, user_name, user_birth_day) VALUES(?, ?, ?, ?);';
            var params = [req.body.id, key.toString('base64'), req.body.name, req.body.birth];
            conn.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.redirect('/mypage/login');
                }
            })
        })

    } else {
        res.status(500).send('Internal Server Error');
    }
})
app.get('/count', (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    var output = `
        <p>Count: ${req.session.count}</p>
        <p><a href='/count/clear'>clear</a></p>
    `
    res.send(output);

})

app.get('/count/clear', (req, res) => {
    delete req.session.count;
    res.redirect('/count');
})

app.listen(8124, () => {
    console.log('Server Running at port 8124');
})