import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import Board from './Board';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<Switch>
					<Route exact path='/' render={() => <LogIn />} />
					<Route exact path='/game' component={Board} />
				</Switch>
			</div>
		);
	}
}
