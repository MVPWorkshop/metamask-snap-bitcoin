import React, { useContext, useEffect, useState } from 'react';
import Balance from './Balance';
import Transfer from './Transfer';
import './Account.css';
import useAccount from '../hooks/useAccount';
import { ReduxContext } from '../redux/store';

export default function Account() {
	const redux: any = useContext(ReduxContext);

	const [account, setAccount] = useState<string | null | undefined>(null);

	const { getAccount } = useAccount(
		process.env.REACT_APP_SNAP_ID!,
		redux.state.network
	);

	useEffect(() => {
		const _getAccount = async () => {
			const _account = await getAccount();
			console.log(_account);
			setAccount(_account);
		};

		_getAccount();
	}, [getAccount, redux.state.network]);
	return (
		<div className='account'>
			<Balance account={account} />
			<Transfer account={account} />
		</div>
	);
}
