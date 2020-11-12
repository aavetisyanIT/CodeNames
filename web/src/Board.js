import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';
import { pendingBoard } from './constants';

const socket = io.connect('http://localhost:4000');

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.boardRequest() || pendingBoard,
			gameState: null,
			spymaster: '??????',
		};
		this.boardRequest = this.boardRequest.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	boardRequest() {
		const playerIdLocal = window.localStorage.getItem('playerId');
		socket.emit('boardRequest', playerIdLocal);
		socket.on('updatedBoard', (data) => {
			this.setState({
				board: data,
			});
		});
	}
	handleClick(newCoord) {
		let data = { coord: newCoord, playerId: this.props.playerId };
		socket.emit('clickRequest', data);
		socket.on('updatedBoard', (data) => {
			this.setState({
				board: data,
			});
		});
	}

	render() {
		let tblBoard = [];
		//assigning key values and words to Cell component
		for (let y = 0; y < 5; y++) {
			let row = [];
			for (let x = 0; x < 5; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						coord={{ y, x }}
						word={this.state.board[y][x]}
						onClick={this.handleClick}
					/>,
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
			<div>
				<h1>Team: {this.props.teamId} </h1>
				<div className='Board-title'>
					<div className='neon-orange'>Code</div>
					<div className='neon-blue'>Names</div>
				</div>
				<table className='Board'>
					<tbody>{tblBoard}</tbody>
				</table>
				<p>Clue Word:</p>
				<p>Clue Number:</p>
			</div>
		);
	}
}

export default Board;
