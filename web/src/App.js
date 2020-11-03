import React, { Component } from 'react';
import LogIn from './LogIn';
// import Messenger from './Messenger';
// import Board from './Board';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<LogIn />
				{/* <Board />
				<Messenger /> */}
			</div>
		);
	}
}
