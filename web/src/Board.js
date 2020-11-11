import React, { Component } from 'react';
// Messenger component is currently disabled
// import Messanger from './Messanger';
//import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			gameState: null,
			spymaster: '??????',
		};
	}

	render() {
		return (
			<div>
				<h1>BOARD</h1>
				<p>Clue Word:</p>
				<p>Clue Number:</p>
			</div>
		);
	}
}

export default Board;

// let tblBoard = [];
// //assigning key values and words to Cell component
// for (let y = 0; y < 5; y++) {
// 	let row = [];
// 	for (let x = 0; x < 5; x++) {
// 		let coord = `${y}-${x}`;
// 		row.push(
// 			<Cell
// 				key={coord}
// 				coord={{ y, x }}
// 				word={this.state.board[y][x]}
// 				onClick={this.handleClick}
// 			/>,
// 		);
// 	}
// 	tblBoard.push(<tr key={y}>{row}</tr>);
// }

/* <h1>Team: {this.props.initialData.teamId} </h1>
				<div className='Board-title'>
					<div className='neon-orange'>Code</div>
					<div className='neon-blue'>Names</div>
				</div>
				<table className='Board'>
					<tbody>{tblBoard}</tbody>
				</table> */
