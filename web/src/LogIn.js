import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export default class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			team: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { name, team } = this.state;
		socket.emit('LogIn', { name, team });

		let data = 'Hello from LogIn page';
		socket.emit('test', data);
	}

	render() {
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
								name='team'
								value={this.state.team}
								placeholder='teamA or teamB'
								onChange={this.handleChange}
							/>
						</label>
					</p>
					<input type='submit' value='Submit' />
					<p>
						<Link to='/game'>Go to New Game</Link>
					</p>
				</form>
			</div>
		);
	}
}
