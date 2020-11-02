import React, { Component } from 'react';
import { randomWord } from './words';
import { shuffle } from './randomRoll';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		rollBoard: [
			['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
			['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
			['teamA', 'civilian', 'teamA', 'teamB', 'assassin'],
			['teamA', 'teamB', 'civilian', 'teamB', 'civilian'],
			['teamA', 'teamB', 'teamA', 'teamB', 'civilian'],
		],
	};

	constructor(props) {
		super(props);
		this.state = {
			board: this.createBoard(),
			rollAssign: this.rollAssign(),
		};
		this.createBoard = this.createBoard.bind(this);
		this.rollAssign = this.rollAssign.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		//sending out original baord
		const { board } = this.state;
		socket.emit('state', { board });

		//updating current board with new baord with just opened roll
		socket.on('state', ({ data }) => {
			this.setState({ board: data.board });
			console.log(data);
		});
	}

	//create initial board with ramdon words
	createBoard() {
		let board = [];
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				row.push(randomWord());
			}
			board.push(row);
		}
		return board;
	}
	//shuffling rolls in rollBoard
	rollAssign() {
		let rollBoard = shuffle(this.props.rollBoard);
		shuffle(rollBoard[0]);
		shuffle(rollBoard[1]);
		shuffle(rollBoard[2]);
		shuffle(rollBoard[3]);
		shuffle(rollBoard[4]);
		return rollBoard;
	}

	//retriving data on clicked Cell component
	//updating Board state to show Cell roll on the board
	handleClick(clickedCell) {
		let y = clickedCell.curCoord.y;
		let x = clickedCell.curCoord.x;
		let flippedRoll = clickedCell.curRoll;
		let updatedBoard = this.state.board;
		updatedBoard[y][x] = flippedRoll;
		this.setState({ board: updatedBoard });

		//sending out updated board with opened roll
		const { board } = this.state;
		socket.emit('state', { board });
	}

	render() {
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
						roll={this.state.rollAssign[y][x]}
						displayed={this.state.board[y][x]}
						onClick={this.handleClick}
					/>,
				);
			}
			tblBoard.push(<tr key={y}>{row}</tr>);
		}
		return (
			<div>
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
