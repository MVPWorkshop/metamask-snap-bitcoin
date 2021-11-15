import React from 'react';
import './Dropdown.css';

interface DropdownProps {
	options: string[];
}

export default function Dropdown(props: DropdownProps) {
	return (
		<div className='select'>
			{/* <div className='select_arrow'></div> */}
			<select>
				{props.options.map((option) => (
					<option>{option}</option>
				))}
			</select>
			<div className='select_arrow'></div>
		</div>
	);
}
