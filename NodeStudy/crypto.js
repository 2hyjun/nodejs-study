var crypto = require('crypto');

var pw1 = crypto.createHash('sha256');
var pw2 = crypto.createHash('sha256');
							//algorithm


pw1.update('zk5687');
pw2.update('zk5687');


var output1 = pw1.digest('hex');
var output2 = pw2.digest('hex');
						//make encrypted hash value be watchable
						//ex) base64
console.log(output1 === output2);