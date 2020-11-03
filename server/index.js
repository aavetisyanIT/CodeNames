const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Game } = require('./game.js');
const { Team } = require('./team.js');
const { Player } = require('./player.js');

let game = new Game();

let teamA = new Team('teamA');
let teamB = new Team('teamB');

io.on('connection', (socket) => {
	//messanger is disconnected for now
	// socket.on('message', ({ name, message }) => {
	// 	io.emit('message', { name, message });
	// });

	socket.on('state', (serverBoard) => {
		io.emit('state', { serverBoard });
	});

	socket.on('LogIn', (LogInData) => {
		let newPlayer = new Player(socket.id, LogInData.name, LogInData.team);
		if (newPlayer.teamId === 'teamA') {
			//add player to teamA
			teamA.addPlayer(newPlayer);
			//add updated teamA to the Game
			game.addTeam(teamA);
		} else if (newPlayer.teamId === 'teamB') {
			//add player to teamB
			teamB.addPlayer(newPlayer);
			//add updated teamA to the Game
			game.addTeam(teamB);
		}
		//start a new game
		game.makeGame(teamA, teamB);
	});

	socket.on('click', (click) => {
		console.log(click);
	});
});

http.listen(4000, function () {
	console.log('listening on port 4000');
});
