import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curCoord: this.props.coord,
		};
	}

	render() {
		return (
			<td
				className='Cell Cell-lit'
				onClick={() => this.props.onClick(this.state.curCoord)}
			>
				{this.props.word}
			</td>
		);
	}
}

export default Cell;
