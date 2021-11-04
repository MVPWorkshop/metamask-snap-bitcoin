import React from 'react';
import { Network } from '../types';
import Dropdown from './Dropdown';
import './Header.css';

export default function Header() {
	return (
		<div className='header'>
			<img
				src='https://avatars.githubusercontent.com/u/34801295?v=4'
				alt='Avatar'
				style={{
					borderRadius: '50%',
					height: '30px',
					// float: 'left',
				}}></img>
			<Dropdown options={[Network.Bitcoin, Network.Testnet]} />
		</div>
	);
}
