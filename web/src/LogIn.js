import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GameContext } from './context/gameContext';
import PlayersList from './PlayersList';

const socket = io.connect('http://localhost:4000');

const LogIn = React.memo(() => {
	console.log('LogIn');

	const { name, setName } = useContext(GameContext);
	const { teamId, setTeamId } = useContext(GameContext);
	const { setPlayerId } = useContext(GameContext);
	const { addToGame, setAddToGame } = useContext(GameContext);
	const { joinButtonDisabled, setJoinButtonDisabled } = useContext(
		GameContext,
	);

	//setting state with input values
	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleTeamChange = (e) => {
		setTeamId(e.target.value);
	};
	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			//sending name and team picked by player to set player and teams
			const socketId = socket.id;

			if (name !== '' && teamId !== '') {
				socket.emit('initialGameRequest', { name, teamId, socketId });
				//setting gameId and switching buttons to start game
				socket.on('addToGame', () => {
					setPlayerId(socket.id);
					setAddToGame(true);
				});
			} else alert('Both name and team are required');
			window.localStorage.setItem('playerId', socket.id);
			setName(name);
			setPlayerId(socket.id);
			setTeamId(teamId);
			name !== '' && teamId !== ''
				? setJoinButtonDisabled(true)
				: setJoinButtonDisabled(false);
		},
		[
			name,
			setAddToGame,
			setJoinButtonDisabled,
			setName,
			setPlayerId,
			setTeamId,
			teamId,
		],
	);

	let logInButton;
	if (!addToGame) {
		logInButton = <input type='submit' value='JOIN TO SEE PLAYERS' />;
	} else {
		logInButton = (
			<>
				<p>
					<Link to='/game'>START PLAYING</Link>
				</p>
				<PlayersList />
			</>
		);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h4>Join YOUR TEAM</h4>
				<label>Name: </label>
				<input
					type='text'
					value={name}
					onChange={handleNameChange}
					disabled={joinButtonDisabled}
				/>
				<div onChange={handleTeamChange}>
					<label>Team:</label>
					<input
						type='radio'
						value='teamA'
						disabled={joinButtonDisabled}
						name='teamId'
					/>
					Red Team
					<input
						type='radio'
						value='teamB'
						disabled={joinButtonDisabled}
						name='teamId'
					/>
					Blue Team
				</div>
				{logInButton}
			</form>
		</div>
	);
});

export default LogIn;
