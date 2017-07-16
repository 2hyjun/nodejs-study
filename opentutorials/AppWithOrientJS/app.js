var OrientDB = require('orientjs');

var server = OrientDB({
    hot: 'localhost',
    port: 2424,
    username: 'root',
    password: 'zk5687'
});

var db = server.use('o2');
/**
 * SELECT
 */
/*
//-------------------------------------------------------------
var sql = 'SELECT FROM topic';
db.query(sql).then((results) => {
    console.log(results); ** 모든 행 출력 **
})
//-------------------------------------------------------------
db.record.get('#22:0')
.then((record) => {
    console.log('Loaded record: ', record); ** rid가 #22:0인 행 출력. **
})
//-------------------------------------------------------------
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
    params: {
        rid: '#22:0'
    }
};
db.query(sql, param).then((result) => {
    console.log(result); ** rid가 #22:0인 행 출력. by sql
})
//-------------------------------------------------------------
/**
 *  INSERT
 */
// var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
// var param = {
//     params: {
//         title: 'Express',
//         desc: 'Express is framwork for web'
//     }
// }
// db.query(sql, param).then((results) => {
//     console.log(results)
// })


// ********  Update ******

// var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid;'
// var param = {
//     params: {
//         title: 'ExpressJS hehe',
//         rid: '#23:0'
//     }
// }
// db.query(sql, param).then((result) => {
//     console.log(result);
// })

// ********  DELETE ******

var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql, {
    params: {
        rid: '#23:0'
    }
}).then((result) => {
    console.log(result);
})

