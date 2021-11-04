import React, { useEffect } from 'react';
import Balance from './Balance';
import Transfer from './Transfer';
import './Account.css';
import useAccount from '../hooks/useAccount';
import { Network } from '../types';

export default function Account() {
	const snapId = `http://localhost:8081/package.json`;
	const { getAccount } = useAccount(snapId, Network.Testnet);

	useEffect(() => {
		const _getAccount = async () => {
			const _account = await getAccount();
			console.log(_account);
		};

		_getAccount();
	}, [getAccount]);
	return (
		<div className='account'>
			<Balance />
			<Transfer />
		</div>
	);
}
