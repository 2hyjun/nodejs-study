process.on('exit', (code) => {
	console.log('Bye Bye~~');
})

process.emit('exit');
process.emit('exit');

process.on('exit', (code1) => {
	console.log('Bye Bye2~~');
})

process.emit('exit');
process.emit('exit');

console.log('Proecss running')