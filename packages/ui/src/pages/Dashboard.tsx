import React from 'react';
import Account from '../components/Account';
import Button from '../components/Button';
import Header from '../components/Header';
import useConnect from '../hooks/useConnect';
import './Dashboard.css';

export default function Dashboard() {
	const { connect, error, isConnected } = useConnect(
		process.env.REACT_APP_SNAP_ID!
	);

	return (
		<div className='container'>
			{isConnected ? (
				<>
					<Header />
					<Account />
				</>
			) : (
				<div className='connectContainer'>
					<Button text='Connect' onClick={connect} />
					{error && <p>{error}</p>}
				</div>
			)}
		</div>
	);
}
