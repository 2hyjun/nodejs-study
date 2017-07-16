process.on('exit', (code) => {
	console.log("Bye Bye");
});
//proecss.on(event 종류, event handler)

process.on('uncaughtException', (error) => {
	console.log("There was a exception..");
});

var count = 0;

var test = () => {
	count = count + 1;
	console.log(count);
	if (count > 3) return;
	setTimeout(test, 2000);
	error.error.error();
}
setTimeout(test, 2000);