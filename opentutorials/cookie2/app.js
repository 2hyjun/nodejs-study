var express = require('express');
var app = express();

var OrientDB = require('orientjs');
var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: 'zk5687'
})
var db = server.use('o2');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.pretty = true;
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('HomePage', {
        img: 'hsk.gif',
        time: Date()
    });
})

app.get('/product', (req, res) => {

    var sql = 'select from topic';
    db.query(sql).then((topics) => {
        //console.log(req.query.addrid);
        if (req.query.addrid === undefined) {
            res.render('product', {
                products: topics
            })
        } else {
            var sql = 'select from topic where @rid=:rid';
            //console.log(req.query.addrid);
            db.query(sql, {
                params: {
                    rid: req.query.addrid
                }
            }).then((result) => {
                var curCookie = req.cookies.cart;
                if (curCookie) {
                    var founded = false;
                    for (var i in curCookie) {
                        if (curCookie[i].rid == result[0]['@rid']) {
                            curCookie[i].count++;
                            founded = true;
                            break;
                        }
                    }
                    if (!founded) {
                        curCookie.push({
                            title: result[0].title,
                            count: 1,
                            rid: result[0]['@rid']
                        })
                    }

                } else {
                    curCookie = [];
                    curCookie.push({
                        title: result[0].title,
                        count: 1,
                        rid: result[0]['@rid']
                    })
                }
                //console.log(curCookie);
                res.cookie('cart', curCookie)
                res.redirect('/cart');
            })
        }

    })
})

app.get('/cart', (req, res) => {
    var curCookie = req.cookies.cart;
    console.log('curCookie', curCookie);
    if (req.query.deleteRid) {
        console.log('query rid', req.query.deleteRid);

        for (var i = 0; i < curCookie.length; i++) {
            if(curCookie[i].rid == req.query.deleteRid) {
                console.log('curCoookie[i]', curCookie[i]);
                if (curCookie[i].count == 1) {
                    if (curCookie.length == 1) {
                        res.clearCookie('cart');
                        res.redirect('/cart');
                    }
                    else 
                        curCookie.splice(i, 1);     
                    
                }  
                else
                    curCookie[i].count--;
            }
        }
        res.cookie('cart', curCookie);
        res.redirect('/cart');
    } else {
        res.render('cart', {
            cookie: req.cookies.cart
        });
    }
    
})


app.listen(8124, () => {
    console.log('Server Running at port 8124');
})