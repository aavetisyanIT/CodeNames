const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message });
	});
	socket.on('state', (data) => {
		console.log(socket.id);
		io.emit('state', { data });
	});
});

http.listen(4000, function () {
	console.log('listening on port 4000');
});
