var crypto = require('crypto');

var salt = 'fuckyouhackerthisissaltforyou';

crypto.pbkdf2('zk5687', salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
    console.log("async", key.toString('base64'));
    //console.log('SqDTb3F080cpqW3m7crBFkY5BEue+7pOgZO/NijkhEnAZok6PNCelu3FEtpRJhj5'.length);
   // console.log(key.toString('base64') === 'SqDTb3F080cpqW3m7crBFkY5BEue+7pOgZO/NijkhEnAZok6PNCelu3FEtpRJhj5')
})
var pw = crypto.pbkdf2Sync('zk5687', salt.toString('base64'), 1000, 64, 'sha512');

console.log("sync", pw.toString('base64'));