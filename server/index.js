// Setup basic express server
const express = require('express');
const app = express();
const fs = require('fs');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const { Game } = require('./game.js');
const { Team } = require('./team.js');
const { Player } = require('./player.js');

let game = new Game();
let teamA = new Team('teamA');
let teamB = new Team('teamB');

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	//!!!Guardfile is not working and needs to be setup LATER!!!!!!!!
	//fs.writeFile('/start.log', 'started');
});

// Entire GameCollection Object holds all games and info
let gameCollection = new (function () {
	(this.totalGameCount = 0), (this.gameList = []);
})();

io.on('connection', (socket) => {
	//when the client  requests to make a Game
	socket.on('makeGame', (data) => {
		//Creating a new Player
		let newPlayer = new Player(socket.id, data.name, data.team);

		//Generating random gameId and adding new game to gameCollection
		let gameId = (Math.random() + 1).toString(36).slice(2, 18);
		gameCollection.gameList.push(gameId);
		gameCollection.totalGameCount++;

		//Assigning gameId to both teams
		teamA.gameId = gameId;
		teamB.gameId = gameId;

		//adding new players to teams:
		if (newPlayer.teamId === 'teamA') {
			//add player to teamA
			teamA.addPlayer(newPlayer);
		} else if (newPlayer.teamId === 'teamB') {
			//add player to teamB
			teamB.addPlayer(newPlayer);
		}

		//ADDING TEAMS TO A GAME
		if (teamA.playersNum >= 1 && teamB.playersNum >= 1) {
			//create new Game
			new Game(gameId);
			// createing game board of random words
			game.makeGame(gameId);
			console.log(game);
			io.emit('gameCreated', gameId);
			initialBoard = game.board;
			let data = initialBoard;
			io.emit('setBoard', data);
		}

		//Game Validating Feature(NEEDS TO BE CREATED!!!!!):
		for (let i = 0; i < gameCollection.gameList.length; i++) {}
	});
});
