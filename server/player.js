class Player {
	constructor(id, curSocketId, name, teamId) {
		this.id = id;
		this.curSocketId = curSocketId;
		this.name = name;
		this.teamId = teamId;
		this.isMaster = false;
	}
}
exports.Player = Player;
