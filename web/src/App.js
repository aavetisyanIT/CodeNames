import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game: [],
		};
	}
	render() {
		const handleData = (game) => this.setState({ game: game });
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
						render={() => <Board logInData={this.state.game} />}
					/>
				</Switch>
			</div>
		);
	}
}
