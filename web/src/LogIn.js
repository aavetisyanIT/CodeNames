import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GameContext } from './context/gameContext';

const socket = io.connect('http://localhost:4000');

export default function LogIn() {
	const { name, setName } = useContext(GameContext);
	const { teamId, setTeamId } = useContext(GameContext);
	const { setPlayerId } = useContext(GameContext);
	const { addToGame, setAddToGame } = useContext(GameContext);

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
				<Link to='/game'>GO TO THE GAME</Link>
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
				<p>
					<label>
						Team:
						<input
							type='text'
							value={teamId}
							placeholder='teamA or teamB'
							onChange={handleTeamChange}
						/>
					</label>
				</p>
				{logInButton}
			</form>
		</div>
	);
}
