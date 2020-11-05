const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const randomWord = require('./random_word.js');
const shuffle = require('./shuffle.js');
const { Team } = require('./team.js');

class Game {
	board = [];
	roleBoard = [];

	constructor() {
		//setting gameId
		this.gameId = (Math.random() + 1).toString(36).slice(2, 18);
		//generating random roll board
		this.createRoleBoard();
		//generate board of ramdom words
		this.createBoard();

		this.teamA = new Team('teamA');
		this.teamB = new Team('teamB');
		this.players = new Map();
		this.sockets = new Map();
	}
	//adding new team to a game
	addPlayer(newPlayer, socket) {
		this.players[newPlayer.id] = newPlayer;
		this.sockets[newPlayer.id] = socket;
	}

	addPlayerToTeam(playerId, teamId) {
		let player = this.players[playerId];

		if (player !== null) {
			if (this.teamA.id === teamId) {
				this.teamA.addPlayer(player);
			} else if (this.teamB.id === teamId) {
				this.teamB.addPlayer(player);
			}
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
		this.board = board;
	}

	createRoleBoard() {
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
}

exports.Game = Game;
