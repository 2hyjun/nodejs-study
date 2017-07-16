var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<fieldset>Hello~ <img src="hsk.gif"></fieldset>');
})

app.get('/dynamic', (req, res) => {
    var lis = '';
    for (var i = 0; i < 5; i++) {
        lis = lis + `<li>coding${i + 1}</li>`
    }
    var time = Date();

    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf8">
            <title></title>
        </head>
        <body>
            <h1>Hello, Dynamic!~</h1>
            <ul>${lis}</ul>
            ${time}
        </body>
    </html>`
    /**
     *  동적으로 처리를 하게 되면, 작성했던 코드가 다시 실행해야 하기 때문에, 수정하면 다시 켜야함.
     *  정적으로 처리를 하게 되면, 수정해도 다시 켜야 할 필요 없음. But 프로그래밍적인 수행 불가.
     */
    res.send(output);
})

app.get('/route', (req, res) => {
    res.send('Hello router~ <img src="pairi.jpg">')
})

app.listen(3000);