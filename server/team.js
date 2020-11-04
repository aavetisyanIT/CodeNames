class Team {
	players = [];
	playersNum = 0;

	constructor(teamId, gameId) {
		this.teamId = teamId;
		this.gameId = gameId;
	}

	addPlayer(newPlayer) {
		this.players.push(newPlayer);
		//I wasn't able to verify if player already exists
		this.playersNum++;
	}

	removePlayer(player) {
		console.log('player needs to be removed:  ' + player);
	}
}

exports.Team = Team;
