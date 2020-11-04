import React, { Component } from 'react';
// Messenger component
// import Messanger from './Messanger';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		pendingBoard: [
			[
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
			],
			[
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
			],
			[
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
			],
			[
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
			],
			[
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
				'waiting for players',
			],
		],
	};

	constructor(props) {
		super(props);
		this.state = {
			board: this.props.pendingBoard,
			roleAssign: this.props.pendingBoard,
			teamId: null,
			gameId: null,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {}

	//retriving data on clicked Cell component
	//updating Board state to show Cell role on the board
	handleClick(clickedCell) {
		let y = clickedCell.curCoord.y;
		let x = clickedCell.curCoord.x;
		let flippedRole = clickedCell.curRole;
		let updatedBoard = this.state.board;
		updatedBoard[y][x] = flippedRole;
		//this.setState({ board: updatedBoard });
	}

	render() {
		socket.on('setBoard', (data) => {
			console.log(data);
			this.setState({ board: data });
		});
		let tblBoard = [];
		//assigning key values and words to Cell component
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						coord={{ y, x }}
						role={this.state.roleAssign[y][x]}
						displayed={this.state.board[y][x]}
						onClick={this.handleClick}
					/>,
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
			<div>
				<h1>Team: {this.state.teamId} </h1>
				<div className='Board-title'>
					<div className='neon-orange'>Code</div>
					<div className='neon-blue'>Names</div>
				</div>
				<table className='Board'>
					<tbody>{tblBoard}</tbody>
				</table>
				<p>Clue Word:</p>
				<p>Clue Number:</p>
				{/* Messenger */}
				{/* <Messanger /> */}
			</div>
		);
	}
}

export default Board;
