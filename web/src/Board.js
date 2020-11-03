import React, { Component } from 'react';
// Messenger component
// import Messanger from './Messanger';
import { randomWord } from './words';
import { shuffle } from './randomRole';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		roleBoard: [
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
			roleAssign: this.roleAssign(),
			teamId: 'teamID',
		};
		this.createBoard = this.createBoard.bind(this);
		this.roleAssign = this.roleAssign.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		//sending out original baord
		const { board } = this.state;
		socket.emit('state', { board });

		//updating current board with new baord with just opened role
		socket.on('state', ({ serverBoard }) => {
			this.setState({ board: serverBoard.board });
		});

		//test socket
		socket.on('test', (data) => {
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
	//shuffling roles in roleBoard
	roleAssign() {
		let roleBoard = shuffle(this.props.roleBoard);
		shuffle(roleBoard[0]);
		shuffle(roleBoard[1]);
		shuffle(roleBoard[2]);
		shuffle(roleBoard[3]);
		shuffle(roleBoard[4]);
		return roleBoard;
	}

	//retriving data on clicked Cell component
	//updating Board state to show Cell role on the board
	handleClick(clickedCell) {
		let y = clickedCell.curCoord.y;
		let x = clickedCell.curCoord.x;
		let flippedRole = clickedCell.curRole;
		let updatedBoard = this.state.board;
		updatedBoard[y][x] = flippedRole;
		this.setState({ board: updatedBoard });

		//sending out updated board with opened role
		const { board } = this.state;
		socket.emit('state', { board });
		const click = 'Clicked on a cell';
		socket.emit('click', click);
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
