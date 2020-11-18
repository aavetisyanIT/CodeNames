import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export default function LogIn(props) {
	const [name, setName] = useState('');
	const [teamId, setTeamId] = useState('');
	const [playerId, setPlayerId] = useState('');
	const [addToGame, setAddToGame] = useState(false);

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
		const data = {
			name: name,
			playerId: socket.id,
			teamId: teamId,
		};
		window.localStorage.setItem('playerId', playerId);
		props.logInData(data);
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
						name='name'
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
							name='teamId'
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
