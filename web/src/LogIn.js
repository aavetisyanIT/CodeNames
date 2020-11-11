import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			teamId: '',
			addToGame: false,
			playerId: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	//setting state with input values
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		let logInButton;
		if (!this.state.addToGame) {
			logInButton = <input type='submit' value='REQUEST TO JOIN A GAME' />;
		} else {
			logInButton = (
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
					{logInButton}
				</form>
			</div>
		);
	}
}
