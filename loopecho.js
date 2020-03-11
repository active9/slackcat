console.log('Hi');

setInterval(function() {
	console.log('Hello!');
}, 1000);

setTimeout(function() {
	console.log('Bye!');
	process.exit(1);
}, 30000);