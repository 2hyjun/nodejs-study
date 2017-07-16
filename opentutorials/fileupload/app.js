var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.pretty = true;
app.set('view engine', 'pug');

app.use(express.static('public'));

// ------------------------------------------------------------
var multer = require('multer');
var _storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // 아래 와 달리 file name 설정.
    }
})
var upload = multer({
    storage: _storage 
});
// ------------------------------------------------------------

app.get('/upload', (req, res) => {
    res.render('upload');
})

app.post('/upload', upload.single('userfile'), (req, res) => {
    //    `````````` html페이지에서 file type input의 name이 들어가야함. 
    //                              "field" or "field name"
    //                             req.file.fieldname으로 확인 가능.
    // upload.single('avatar'): 미들웨어
    // 사용자가 post방식으로 보낸 데이터가 /upload path를 향하고 있다면,
    // 미들웨어(upload.single("avatar"))가 먼저 실행됨.
    // 이 미들웨어를 거치면 req객체에 파일이 추가됨.
    console.log(req.file); 
    // {
    //     fieldname: 'userfile', 필드( file type inputd의 name )
    //     originalname: 'infinityWallpaper.png', 
    //     encoding: '7bit',
    //     mimetype: 'image/png', 파일 타입
    //     destination: 'uploads/', 저장 목적지
    //     filename: 'f0b3dd522323099e50d04416e27e4e77', 저장 될 파일 이름. 아무 것도 하지 않은 상태.
    //     path: 'uploads\\f0b3dd522323099e50d04416e27e4e77' 저장 된 위치.,
    //     size: 276727
    // }
    res.send('uploaded!' + req.file.filename);
})

app.use('/user', express.static('uploads'));
app.listen(8124, () => {
    console.log("Server running at port 8124");
})