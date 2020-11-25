const { Team } = require('./team.js');
const randomWord = require('./random_word.js');
const shuffle = require('./shuffle.js');

class Game {
	board = [];
	roleBoard = [];
	io = {};
	// spymasterTeamA = {};
	// spymasterTeamB = {};
	//teamA always has a frist move
	currentMove = 'teamA';

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

	addPlayer(newPlayer, socket) {
		this.players.set(newPlayer.id, newPlayer);
		this.sockets.set(newPlayer.id, socket);
	}

	addPlayerToTeam(playerId, teamId) {
		let player = this.players.get(playerId);
		if (player !== null) {
			if (this.teamA.id === teamId) {
				this.teamA.addPlayer(player);
				//this.notifyTeamAPlayersUpdate();
			} else if (this.teamB.id === teamId) {
				this.teamB.addPlayer(player);
				//this.notifyTeamBPlayersUpdate();
			}
		}
	}
	notifyTeamAPlayersUpdate() {
		let players = this.teamAPlayers();
		players.forEach((player) => {
			let socket = this.sockets.get(player.id);
			socket.emit('playersUpdate', players);
		});
	}

	notifyTeamBPlayersUpdate() {
		let players = this.teamBPlayers();
		players.forEach((player) => {
			let socket = this.sockets.get(player.id);
			socket.emit('playersUpdate', players);
		});
	}

	teamAPlayers() {
		let players = Array.from(this.players.values());
		return players.filter((player) => player.teamId == 'teamA');
	}
	teamBPlayers() {
		let players = Array.from(this.players.values());
		return players.filter((player) => player.teamId == 'teamB');
	}

	selectSpymaster(teamPlayers) {
		let teamCount = teamPlayers.length;
		let rand = Math.floor(Math.random() * teamCount);
		let spymaster = teamPlayers[rand];
		game.addSpymaster(spymaster);
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
