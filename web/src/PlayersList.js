import React, { useContext } from 'react';
import { GameContext } from './context/gameContext';

export default function PlayersList() {
	const { players } = useContext(GameContext);
	const { teamId } = useContext(GameContext);

	let title;
	if (teamId === '') {
		title = <h4>Waiting for players to join</h4>;
	} else if (teamId === 'teamA') {
		title = <h4>Red Team Players:</h4>;
	} else if (teamId === 'teamB') {
		title = <h4>Blue Team Players:</h4>;
	}

	return (
		<div>
			<form>
				{title}
				{players.map((player, index) => (
					<li key={index}>{player}</li>
				))}
			</form>
		</div>
	);
}
