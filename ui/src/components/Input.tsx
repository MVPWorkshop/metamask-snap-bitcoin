import React from 'react';
import './Input.css';

interface InputProps {
	value?: string;
	readonly?: boolean;
}

export default function Input(props: InputProps) {
	return (
		<input
			className='input'
			type='text'
			readOnly={props.readonly}
			value={props.value}
		/>
	);
}
