const { Player } = require('./player.js');
let player = new Player();

class Team {
	players = [];

	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	addPlayer(player) {
		if (this.players.includes(player)) {
			return;
		}
		this.players.push(player);
	}

	removePlayer(player) {
		console.log('player removed' + player);
	}
}

exports.Team = Team;
