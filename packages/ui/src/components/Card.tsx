import React from 'react';
import './Card.css';

interface CardProps {
	headline: string;
}

export default function Card(props: CardProps) {
	return (
		<div className='card'>
			<h2>{props.headline}</h2>
		</div>
	);
}
