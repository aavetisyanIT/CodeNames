import React, { useContext, useEffect } from 'react';
import { GameContext } from './context/gameContext';
//import io from 'socket.io-client';

//const socket = io.connect('http://localhost:4000');

export default function PlayersList() {
	const { players, setPlayers } = useContext(GameContext);
	const { teamId } = useContext(GameContext);

	// useEffect(() => {
	// 	let currentPlayers = [];

	// 	console.log('in useEffect');
	// 	socket.emit('requestPlayersUpadate', teamId);
	// 	// socket.on('test', (data) => {
	// 	// 	console.log(data);
	// 	// });
	// 	socket.on('playersUpdate', (object) => {
	// 		console.log(object);
	// 		object.forEach((player) => currentPlayers.push(player.name));
	// 	});
	// 	setPlayers(currentPlayers);
	// }, [teamId, setPlayers]);

	// socket.on('playersUpdate', (data) => {
	// 	console.log('WORKING!!!!');
	// 	console.log(data);
	// });

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
}
