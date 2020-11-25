import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GameContext } from './context/gameContext';
import PlayersList from './PlayersList';

const socket = io.connect('http://localhost:4000');

export default function LogIn() {
	const { name, setName } = useContext(GameContext);
	const { teamId, setTeamId } = useContext(GameContext);
	const { setPlayerId } = useContext(GameContext);
	const { addToGame, setAddToGame } = useContext(GameContext);
	const { setPlayers } = useContext(GameContext);

	useEffect(() => {
		let currentPlayers = [];
		socket.on('playersUpdate', (object) => {
			object.forEach((player) => currentPlayers.push(player.name));
		});
		setPlayers(currentPlayers);
	}, [setPlayers]);

	//setting state with input values
	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleTeamChange = (e) => {
		setTeamId(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//sending name and team picked by player to set player and teams
		const socketId = socket.id;
		socket.emit('initialGameRequest', { name, teamId, socketId });
		//setting gameId and switching buttons to start game
		socket.on('addToGame', () => {
			setPlayerId(socket.id);
			setAddToGame(true);
		});
		window.localStorage.setItem('playerId', socket.id);
		setName(name);
		setPlayerId(socket.id);
		setTeamId(teamId);
	};

	let logInButton;
	if (!addToGame) {
		logInButton = <input type='submit' value='REQUEST TO JOIN A GAME' />;
	} else {
		logInButton = (
			<p>
				<Link to='/game'>START PLAYING</Link>
			</p>
		);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h4>Join YOUR TEAM</h4>
				<label>
					Name:
					<input
						type='text'
						value={name}
						placeholder='Name'
						onChange={handleNameChange}
					/>
				</label>
				<div onChange={handleTeamChange}>
					<input type='radio' value='teamA' name='teamId' />
					Red Team
					<input type='radio' value='teamB' name='teamId' />
					Blue Team
				</div>
				{logInButton}
			</form>
			<PlayersList />
		</div>
	);
}
