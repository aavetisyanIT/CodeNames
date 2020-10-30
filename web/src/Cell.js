import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curWord: this.props.displayed,
			curRoll: this.props.roll,
			curCoord: this.props.coord,
		};
	}

	render() {
		return (
			<td
				className='Cell Cell-lit'
				onClick={() => this.props.onClick(this.state)}
			>
				{this.props.displayed}
			</td>
		);
	}
}

export default Cell;
