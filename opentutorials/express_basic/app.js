var express = require('express'); // express는 사실 함수.
var app = express();
/**
 * Get 방식: Url을 직접 치고 들어오는 방식.
 * Post 방식: ?
 */

app.get('/', (req, res) => {
    // Homepage
    res.send('<fieldset><h1>Hi</h1></fieldset>');
})

app.get('/login', (req, res) => {
    res.send('Login please')
})
// app.get('/login'): 라우터
// call back 함수: controller


app.listen(3000, () => {
    console.log('Connected 3000 port!');
});
