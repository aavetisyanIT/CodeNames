import React, { useContext, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';
import io from 'socket.io-client';
import { GameContext } from './context/gameContext';

const socket = io.connect('http://localhost:4000');

const Board = () => {
	const { board, setBoard } = useContext(GameContext);
	const { playerId } = useContext(GameContext);
	const { teamId } = useContext(GameContext);

	useEffect(() => {
		socket.emit('boardRequest', playerId);
		socket.on('updatedBoard', (data) => {
			setBoard(data);
		});
	}, [playerId, setBoard]);

	const handleClick = (newCoord) => {
		let data = { coord: newCoord, playerId: playerId };
		socket.emit('clickRequest', data);
		socket.on('testMsg', (data) => {
			setBoard(data);
		});
		socket.on('playersUpdate', (data) => {
			console.log(data);
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
};

export default Board;
