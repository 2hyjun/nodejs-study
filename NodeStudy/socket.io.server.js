var http = require('http'),
    fs = require('fs'),
    socketio = require('socket.io');

var server = http.createServer((req, res) => {
    // HTMLPage.html 읽음
    fs.readFile('HTMLPage.html', (err, data) => {
        res.writeHead(200, { 'ContentType': 'text/html'});
        res.end(data);
    });
}).listen(8124, () => {
    console.log('server is running at localhost:8124');
});

// 소켓 서버를 생성 및 실행합니다
var io = socketio.listen(server);
io.sockets.on('connection', (socket) => {

});