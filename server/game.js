const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

class Game {
	teamA = [];
	teamB = [];
	board = [];
	roleBoard = [
		['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
		['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
		['teamA', 'civilian', 'teamA', 'teamB', 'assassin'],
		['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
		['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
	];

	constructor(id, board, team, score) {
		(this.board = board),
			(this.team = team),
			(this.score = score),
			(this.id = id);
	}
	//adding new team to a game
	addTeam(newTeam) {
		if (newTeam.teamId === 'teamA') {
			this.teamA.push(newTeam.players);
		} else if (newTeam.teaId === 'teamB') {
			this.teamB.push(newTeam.players);
		}
	}
	makeGame(teamA, teamB) {
		let gameId = (Math.random() + 1).toString(36).slice(2, 18);
		console.log(`making game with ID: ${gameId}`);
	}
}

exports.Game = Game;
