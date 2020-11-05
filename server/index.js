// Setup basic express server
const express = require('express');
const app = express();
const fs = require('fs');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const { Game } = require('./game.js');
const { Player } = require('./player.js');

let game = new Game();

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	//!!!Guardfile is not working and needs to be setup LATER!!!!!!!!
	//fs.writeFile('/start.log', 'started');
});

io.on('connection', (socket) => {
	//initial game request
	socket.on('initialGameRequest', (data) => {
		//Creating a new Player
		let newPlayer = new Player(socket.id, data.name, data.team);

		game.addPlayer(newPlayer, socket);
		game.addPlayerToTeam(newPlayer.id, data.team);

		//sending initial board to all players
		io.emit('setBoard', game.board);
		//console.log(game.board);

		//allowing player to join the game when team has certain number of players
		// let teamAPlayersCount = game.teamA.players.length;
		// let teamBPlayersCount = game.teamB.players.length;

		// if (teamAPlayersCount >= 1 && teamBPlayersCount >= 1) {
		// }
	});
});
