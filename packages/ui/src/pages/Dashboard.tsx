import React from 'react';
import Account from '../components/Account';
import Button from '../components/Button';
import Header from '../components/Header';
import useConnect from '../hooks/useConnect';
import './Dashboard.css';

export default function Dashboard() {
	const { connect, error } = useConnect(process.env.REACT_APP_SNAP_ID!);

	return (
		<div className='container'>
			<Header />
			<Account />
			<Button text='Connect' onClick={connect} />
			{error && <p>{error}</p>}
		</div>
	);
}
