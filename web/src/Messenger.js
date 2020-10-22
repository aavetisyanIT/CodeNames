import React, { Component } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import './App.css';

const socket = io.connect('http://localhost:4000');

export default class Messenger extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			name: '',
			chat: [],
		};
		this.onTextChange = this.onTextChange.bind(this);
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
		this.renderChat = this.renderChat.bind(this);
	}

	componentDidMount() {
		socket.on('message', ({ name, message }) => {
			this.setState((state) => ({
				chat: [...state.chat, { name, message }],
			}));
		});
	}

	onTextChange(e) {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	}

	onMessageSubmit(e) {
		e.preventDefault();
		const { name, message } = this.state;
		socket.emit('message', { name, message });
		this.setState({ message: '', name });
	}

	renderChat() {
		return this.state.chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		));
	}

	render() {
		return (
			<div className='card'>
				<form onSubmit={this.onMessageSubmit}>
					<h1>Messanger</h1>
					<div className='name-field'>
						<TextField
							name='name'
							onChange={this.onTextChange}
							value={this.state.name}
							label='Name'
						/>
					</div>
					<div>
						<TextField
							name='message'
							onChange={this.onTextChange}
							value={this.state.message}
							id='outlined-multiline-static'
							variant='outlined'
							label='Message'
						/>
					</div>
					<button>Send Message</button>
				</form>
				<div className='render-chat'>
					<h1>Chat Log</h1>
					{this.renderChat()}
				</div>
			</div>
		);
	}
}
