const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const randomWord = require('./random_word.js');
const shuffle = require('./shuffle.js');

class Game {
	teamA = [];
	teamB = [];
	board = [];
	roleBoard = [];

	constructor(gameId, score) {
		(this.gameId = gameId), (this.score = score);
	}
	//adding new team to a game
	addTeam(newTeam) {
		if (newTeam.teamId === 'teamA') {
			this.teamA.push(newTeam.players);
		} else if (newTeam.teaId === 'teamB') {
			this.teamB.push(newTeam.players);
		}
	}

	createBoard() {
		let board = [];
		for (let y = 0; y < 5; y++) {
			let row = [];
			for (let x = 0; x < 5; x++) {
				row.push(randomWord());
			}
			board.push(row);
		}
		return board;
	}

	roleAssign() {
		let sampleRoleBoard = [
			['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
			['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
			['teamA', 'civilian', 'teamA', 'teamB', 'assassin'],
			['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
			['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
		];
		let newRoleBoard = shuffle(sampleRoleBoard);
		shuffle(newRoleBoard[0]);
		shuffle(newRoleBoard[1]);
		shuffle(newRoleBoard[2]);
		shuffle(newRoleBoard[3]);
		shuffle(newRoleBoard[4]);
		this.roleBoard = newRoleBoard;
	}

	makeGame(gameId) {
		//setting gameId
		this.gameId = gameId;
		//generating random roll board
		this.roleAssign();
		//generate board of ramdom words
		let board = this.createBoard();
		this.board = board;

		return this.board;
	}
}

exports.Game = Game;
