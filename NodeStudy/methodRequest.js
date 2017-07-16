var http = require('http');

http.createServer((req, res) => {
    if(req.method == 'GET'){
        console.log('GET 요청입니다');
    } else if(req.method == "POST") {
        console.log('POST 요청입니다');
    }
}).listen(8124, () => {
    console.log('server is running at localhost:8124');
});