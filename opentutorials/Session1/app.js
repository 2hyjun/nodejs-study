var express = require('express')
var app = express();

var session = require('express-session');

app.use(session({
    secret: 'asdlfh@KJASDSHhhkasdh@h@j@',
    resave: false,
    saveUninitialized: true
}))


app.get('/count', (req, res) => {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
      // connect.sid의 값과 '1'이라는 값을 연결시켜서,
                            // 이 sid값으로 접근하는 사용자는 '1'이라는 값을 가져 갈 수 있도록 하는 것.
    res.send('count: ' + req.session.count);
})

app.get('/temp' , (req, res) => {
    res.send('result: ' + req.session.count);
})
app.listen(8124, () => {
    console.log('server running at port 8124');
})