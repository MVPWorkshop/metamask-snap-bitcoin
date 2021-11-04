import React from 'react';
import './Button.css';

interface ButtonProps {
	text: string;
	onClick: Function;
	onClickParams?: any;
	style?: any;
}

export default function Button(props: ButtonProps) {
	return (
		<button
			className='button'
			style={props.style}
			onClick={() => props.onClick(props.onClickParams)}>
			<span>{props.text}</span>
		</button>
	);
}
