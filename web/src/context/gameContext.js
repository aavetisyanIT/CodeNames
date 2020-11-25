import React, { createContext, useState } from 'react';
import { pendingBoard } from '../constants';

export const GameContext = createContext();

export function GameStateProvider(props) {
	const [name, setName] = useState('');
	const [teamId, setTeamId] = useState('');
	const [playerId, setPlayerId] = useState('');
	const [addToGame, setAddToGame] = useState(false);
	const [board, setBoard] = useState(pendingBoard);
	const [currentMove, setCurrentMove] = useState(false);
	const [players, setPlayers] = useState([]);

	if (!playerId) {
		const localPlayerId = window.localStorage.getItem('playerId');
		setPlayerId(localPlayerId);
	}

	let state = {
		allContextValue: {
			name,
			setName,
			teamId,
			setTeamId,
			playerId,
			setPlayerId,
			addToGame,
			setAddToGame,
			board,
			setBoard,
			currentMove,
			setCurrentMove,
			players,
			setPlayers,
		},
	};

	return (
		<GameContext.Provider value={state.allContextValue}>
			{props.children}
		</GameContext.Provider>
	);
}
