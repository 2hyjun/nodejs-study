// 모듈과 변수 선언

var express = require('express');
var router = express.Router();

router.get('/index', (req, res) => {
    res.send('<h1>Index page /c </h1>');
});

exports.router = router