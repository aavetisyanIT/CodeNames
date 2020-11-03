const { Team } = require('./team.js');
let team = new Team();
const { Player } = require('./player.js');
let player = new Player();

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
	socket.on('LogIn', (LogInDate) => {
		let newPlayer = new Player(socket.id, LogInDate.name, LogInDate.team);
		let teamA = new Team('teamA');
		let teamB = new Team('teamB');

		if (newPlayer.teamId === 'teamA') {
			teamA.addPlayer(newPlayer);
			console.log(teamA);
		} else {
			teamB.addPlayer(newPlayer);
			console.log(teamB);
		}
	});
});

http.listen(4000, function () {
	console.log('listening on port 4000');
});
