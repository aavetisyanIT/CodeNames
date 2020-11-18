import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import { GameStateProvider } from './context/gameContext';
import './App.css';

export default function App() {
	return (
		<div className='App'>
			<Switch>
				<GameStateProvider>
					<Route exact path='/' component={LogIn} />
					<Route exact path='/game' component={Board} />
				</GameStateProvider>
			</Switch>
		</div>
	);
}
