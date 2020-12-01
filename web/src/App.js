import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import ErrorBoundary from './ErrorBoundary';
import { GameStateProvider } from './context/gameContext';
import './App.css';

export default function App() {
	return (
		<div className='App'>
			<ErrorBoundary>
				<Switch>
					<GameStateProvider>
						<Route exact path='/' component={LogIn} />
						<Route exact path='/game' component={Board} />
					</GameStateProvider>
				</Switch>
			</ErrorBoundary>
		</div>
	);
}
