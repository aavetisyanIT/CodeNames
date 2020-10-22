import React from 'react';
import Messenger from './Messenger';
import Board from './Board';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Board />
			<Messenger />
		</div>
	);
}

export default App;
