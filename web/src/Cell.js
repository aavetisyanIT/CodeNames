import React from 'react';
import './Cell.css';

const Cell = React.memo((props) => {
	return (
		<td className='Cell Cell-lit' onClick={() => props.onClick(props.coord)}>
			{props.word}
		</td>
	);
});

export default Cell;
