class Team {
	players = [];

	constructor(teamId) {
		this.id = teamId;
	}

	addPlayer(newPlayer) {
		//I wasn't able to verify if player already exists
		this.players.push(newPlayer);
	}

	removePlayer(player) {
		console.log('player needs to be removed:  ' + player);
	}
}

exports.Team = Team;
