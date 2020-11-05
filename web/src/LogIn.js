import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [],
			name: '',
			teamId: '',
			addToGame: false,
			playerId: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	//setting state with input values
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		//sending name and team picked by player to set player and teams
		const { name, team } = this.state;
		socket.emit('initialGameRequest', { name, team });

		//setting gameId and switching buttons to start game
		socket.on('setBoard', (initialBoard) => {
			this.setState(
				{ board: initialBoard, playerId: socket.id, addToGame: true },
				() => {
					//sending initian board and new plaayer data to App component
					if (this.props.onChange) {
						this.props.onChange(this.state);
					}
				},
			);
		});
	}

	render() {
		let addToGame;
		if (!this.state.addToGame) {
			addToGame = <input type='submit' value='REQUEST TO JOIN A GAME' />;
		} else {
			addToGame = (
				<p>
					<Link to='/game'>GO TO THE GAME</Link>
				</p>
			);
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h4>Join YOUR TEAM</h4>
					<label>
						Name:
						<input
							type='text'
							name='name'
							value={this.state.name}
							placeholder='Name'
							onChange={this.handleChange}
						/>
					</label>
					<p>
						<label>
							Team:
							<input
								type='text'
								name='teamId'
								value={this.state.team}
								placeholder='teamA or teamB'
								onChange={this.handleChange}
							/>
						</label>
					</p>
					{addToGame}
				</form>
			</div>
		);
	}
}
