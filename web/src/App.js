import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			name: '',
			playerId: '',
			teamId: '',
		};
	}
	render() {
		const handleData = (game) => {
			this.setState({
				board: game.board,
				name: game.name,
				playerId: game.playerId,
				teamId: game.teamId,
			});
		};
		return (
			<div className='App'>
				<Switch>
					<Route
						exact
						path='/'
						render={() => <LogIn onChange={handleData} />}
					/>
					<Route
						exact
						path='/game'
						render={() => <Board initialData={this.state} />}
					/>
				</Switch>
			</div>
		);
	}
}
