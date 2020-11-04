import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			logInData: [],
		};
	}
	render() {
		const handleData = (data) => this.setState({ logInData: data });
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
						render={() => <Board logInData={this.state.logInData} />}
					/>
				</Switch>
			</div>
		);
	}
}
