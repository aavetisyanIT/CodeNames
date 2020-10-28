import React, { Component } from 'react';
import Messenger from './Messenger';
import Board from './Board';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<Board />
				<Messenger />
			</div>
		);
	}
}
