import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default function App() {
	const [playerId, setPlayerId] = useState('');
	const [teamId, setTeamId] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		resetPlayerId();
	}, [playerId]);

	const handleLogInData = (data) => {
		setName(data.name);
		setPlayerId(data.playerId);
		setTeamId(data.teamId);
	};
	const resetPlayerId = () => {
		const playerIdLocal = window.localStorage.getItem('playerId');
		setPlayerId(playerIdLocal);
	};

	return (
		<div className='App'>
			<Switch>
				<Route
					exact
					path='/'
					render={() => <LogIn logInData={handleLogInData} />}
				/>
				<Route
					exact
					path='/game'
					render={() => (
						<Board
							name={name}
							playerId={playerId}
							teamId={teamId}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}
