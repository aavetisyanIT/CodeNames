import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curWord: this.props.word,
			curCoord: this.props.coord,
		};
	}

	render() {
		return (
			<td
				className='Cell Cell-lit'
				onClick={() => this.props.onClick(this.state.curCoord)}
			>
				{this.state.curWord}
			</td>
		);
	}
}

export default Cell;
