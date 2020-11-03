class Team {
	players = [];

	constructor(teamId) {
		this.teamId = teamId;
	}

	addPlayer(newPlayer) {
		const { players } = this;
		const { id } = newPlayer;
		players.push(newPlayer);
		//I wasn't able to verify if player already exists
	}

	removePlayer(player) {
		console.log('player needs to be removed:  ' + player);
	}
}

exports.Team = Team;
