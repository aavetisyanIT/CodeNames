import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerId: '',
			teamId: '',
			name: '',
		};
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route
						exact
						path='/'
						render={() => <LogIn onChange={this.eventHandler} />}
					/>
					<Route exact path='/game' render={() => <Board />} />
				</Switch>
			</div>
		);
	}
}
