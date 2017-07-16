/**
 * Get 방식은 Url에 모든 정보를 포함! 
 * 아이디, 비밀번호..?
 * -> Post방식! Url에 정보를 포함하지 않음
 * or Url에 포함 할수 있는 string의 길이엔 제한이 있음
 * -> 책 본문내용?: Post
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
/**
 * Post방식을 사용할 때는 bodyParser가 사용됨. npm install body-parser --save
 * 그리고 app.use로 <미들웨어>에 연결
 * App에 들어오는 모든 요청: <bodyParser(미들웨어) 통과 후 -> 라우터 >
 */

app.locals.pretty = true;
app.set('view engine', 'pug');

app.get('/form', (req, res) => {
    /**
     * 사용자가 서버에서 데이터를 받는 것 뿐만 아니라
     * 사용자가 서버로 데이터를 보낼 수 있는 html page
     */
    res.render('form');
})

app.get('/form_reciever', (req, res) => {
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ', ' + description);
})

app.post('/form_reciever', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ', ' + description);
})

app.listen(8124, () => {
    console.log("Server is Running at port 8124");
    console.log("Server is Running at port 8124");
})