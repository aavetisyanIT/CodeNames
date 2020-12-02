import React, { useContext } from 'react';
import { GameContext } from './context/gameContext';
//import io from 'socket.io-client';

//const socket = io.connect('http://localhost:4000');

const PlayersList = () => {
	console.log('PlayersList');

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
			{title}
			{players.map((player, index) => (
				<li key={index}>{player}</li>
			))}
		</div>
	);
};

export default PlayersList;
