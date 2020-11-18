// Setup basic express server
const express = require('express');
const app = express();
const fs = require('fs');
const { emit } = require('process');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const { Game } = require('./game.js');
const { gameManager } = require('./game_manager');
const { Player } = require('./player.js');

let game = new Game();

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

function checkCell(y, x) {
	let newBoard = game.board;
	newBoard[y][x] = game.roleBoard[y][x];
	return newBoard;
}

function teamMessage(team, msg) {
	team.players.map((player) => {
		io.to(player.id).emit('teamAMessages', msg);
	});
}

io.sockets.on('connection', (socket) => {
	//initial game request
	socket.on('initialGameRequest', (data) => {
		//Creating a new Player
		let newPlayer = new Player(
			socket.id,
			data.socketId,
			data.name,
			data.teamId,
		);

		game.addPlayer(newPlayer, socket);
		game.addPlayerToTeam(newPlayer.id, data.teamId);

		function selectSpymaster(teamPlayers) {
			let teamCount = teamPlayers.length;
			let rand = Math.floor(Math.random() * teamCount);
			let spymaster = teamPlayers[rand];
			game.addSpymaster(spymaster);
		}

		//create rooms for each team and add player to the room
		if (data.teamId === 'teamA') {
			socket.join('room' + 1);
		} else if (data.teamId === 'teamB') {
			socket.join('room' + 2);
		}

		let teamACount = game.teamA.players.length;
		let teamBCount = game.teamB.players.length;
		if (teamACount && teamBCount >= 1) {
			selectSpymaster(game.teamA.players);
			selectSpymaster(game.teamB.players);
			//letting player join the game
			io.emit('addToGame', socket.id);
		}
	});

	let curMove = true;
	socket.on('moveRequest', (data) => {
		teamMessage(game.teamA, curMove);
	});

	//sending initail board to Board Component
	socket.on('boardRequest', (data) => {
		io.emit('updatedBoard', game.board);
	});
	//listening for clicked cell returning opened role
	socket.on('clickRequest', (data) => {
		let updatedBoard = checkCell(data.coord.y, data.coord.x);
		io.emit('updatedBoard', updatedBoard);
	});
});
