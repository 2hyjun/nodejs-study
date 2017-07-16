var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(session({
    secret: 'adsfaskfasvbh12@sdf@sdfhasdf$',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/auth/login', (req, res) => {
    var output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type='text' name='username' placeholder='username'>
        </p>
        <p>
            <input type='password' name='password' placeholder='password'>
        </p>
        <p>
            <input type='submit'>
        </p>
    </form>    
    `;
    res.send(output);
})

app.get('/auth/logout', (req, res) => {
    delete req.session.displayName;
    res.redirect('/welcome');
})
app.get('/welcome', (req, res) => {
    if(req.session.displayName)
        res.send('<p>Hello, ' + req.session.displayName + 
                '</p><p><a href="/auth/logout">logout</a></p>');
    else
        res.redirect('/auth/login');
})
app.post('/auth/login', (req, res) => {
    var user = {
        username: 'biper94',
        password: 'zk5687',
        displayName: '2Hyjun'
    };
    var uname = req.body.username;
    var pwd = req.body.password;
    
    if (uname === user.username 
        && pwd === user.password) {
            req.session.displayName = user.displayName;
            res.redirect('/welcome');
        } else {
            res.send('Wrong ID & Password <a href="/auth/login">Back to Login</a>');
        }
         

    
})

app.listen(8124, () => {
    console.log('Server running at port 8124');
})