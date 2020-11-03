const { Team } = require('./team.js');
let teamA = new Team('teamA');
let teamB = new Team('teamB');
const { Player } = require('./player.js');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message });
	});
	socket.on('state', (data) => {
		io.emit('state', { data });
	});
	socket.on('LogIn', (LogInData) => {
		let newPlayer = new Player(socket.id, LogInData.name, LogInData.team);
		if (newPlayer.teamId === 'teamA') {
			teamA.addPlayer(newPlayer);
		} else {
			teamB.addPlayer(newPlayer);
		}
	});
});

http.listen(4000, function () {
	console.log('listening on port 4000');
});
