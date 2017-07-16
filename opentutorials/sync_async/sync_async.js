var fs = require('fs');

console.log('Start');

/* Synchronous */
//console.log(fs.readFileSync('./필기.txt').toString());
/**
 * 동기 실행 결과: start -> 필기 출력 -> end
 * 순서대로.
 */


/**
 * Asynchronous
 */
fs.readFile('./필기.txt', 'utf8', (err, data) => {
    console.log(data);
})

/**
 * 비동기 실행 결과: start-> end -> 필기 출력.
 * 먼저 끝나는 순으로.
 */

console.log('End');