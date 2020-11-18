import React, { useContext, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';
import { BoardContext } from './context/gameContext';

const socket = io.connect('http://localhost:4000');

export default function Board() {
	const { board, setBoard } = useContext(BoardContext);
	const { playerId } = useContext(BoardContext);
	const { teamId } = useContext(BoardContext);
	//const { currentMove, setCurrentMove } = useContext(gameContext);

	useEffect(() => {
		const boardRequest = () => {
			socket.emit('boardRequest', playerId);
			socket.on('updatedBoard', (data) => {
				setBoard(data);
			});
		};
		boardRequest();
	}, [playerId, setBoard]);

	const handleClick = (newCoord) => {
		let data = { coord: newCoord, playerId: playerId };
		socket.emit('clickRequest', data);
		socket.on('updatedBoard', (data) => {
			setBoard(data);
		});
	};

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
					word={board[y][x]}
					onClick={handleClick}
				/>,
			);
		}
		tblBoard.push(<tr key={y}>{row}</tr>);
	}

	return (
		<div>
			<h1>{teamId === 'teamA' ? 'Red' : 'Blue'} team </h1>
			{/* <div className='Board-title'>
					<div className='neon-orange'>Code</div>
					<div className='neon-blue'>Names</div>
				</div> */}
			<table className='Board'>
				<tbody>{tblBoard}</tbody>
			</table>
			<p>Clue Word:</p>
			<p>Clue Number:</p>
		</div>
	);
}
