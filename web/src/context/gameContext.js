import React, { createContext, useState, useMemo } from 'react';
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
	const [joinButtonDisabled, setJoinButtonDisabled] = useState(false);

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
			players,
			setPlayers,
			joinButtonDisabled,
			setJoinButtonDisabled,
		}),
		[
			name,
			teamId,
			playerId,
			addToGame,
			board,
			currentMove,
			joinButtonDisabled,
			players,
		],
	);

	return (
		<GameContext.Provider value={providerValue}>
			{props.children}
		</GameContext.Provider>
	);
}
