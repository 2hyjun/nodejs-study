// 모듈과 변수 선언

var express = require('express');
var router = express.Router();

router.get('/index', (req, res) => {
    res.send('<h1>Index page /a </h1>');
});
router.get('/config', (req, res) => {
    res.send('<h1>Config page /a </h1>');
});
exports.router = router