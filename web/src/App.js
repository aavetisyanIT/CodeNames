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
		this.handleLogInData = this.handleLogInData.bind(this);
		this.checkPlayerId = this.checkPlayerId.bind(this);
	}
	componentDidMount() {
		this.checkPlayerId();
	}

	handleLogInData(data) {
		this.setState({
			name: data.name,
			playerId: data.playerId,
			teamId: data.teamId,
		});
	}
	checkPlayerId() {
		const playerIdLocal = window.localStorage.getItem('playerId');
		if (this.state.playerId !== playerIdLocal) {
			this.setState({ playerId: playerIdLocal });
		}
	}

	render() {
		const { name, teamId, playerId } = this.state;
		return (
			<div className='App'>
				<Switch>
					<Route
						exact
						path='/'
						render={() => <LogIn logInData={this.handleLogInData} />}
					/>
					<Route
						exact
						path='/game'
						render={() => (
							<Board name={name} playerId={playerId} teamId={teamId} />
						)}
					/>
				</Switch>
			</div>
		);
	}
}
