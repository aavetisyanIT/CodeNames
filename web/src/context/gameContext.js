import React, { createContext, useState, useMemo } from 'react';
import { pendingBoard } from '../constants';

export const GameContext = createContext();
export const BoardContext = createContext();

export function GameStateProvider(props) {
	const [name, setName] = useState('');
	const [teamId, setTeamId] = useState('');
	const [playerId, setPlayerId] = useState('');
	const [addToGame, setAddToGame] = useState(false);
	const [board, setBoard] = useState(pendingBoard);
	const [currentMove, setCurrentMove] = useState(false);

	if (!playerId) {
		const localPlayerId = window.localStorage.getItem('playerId');
		setPlayerId(localPlayerId);
	}

	const providerValue = useMemo(
		() => ({
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
		}),
		[name, teamId, playerId, addToGame, board, currentMove],
	);
	return (
		<BoardContext.Provider value={providerValue}>
			<GameContext.Provider value={providerValue}>
				{props.children}
			</GameContext.Provider>
		</BoardContext.Provider>
	);
}
