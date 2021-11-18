import React, { useContext, useEffect, useState } from 'react';
import useBtcBalance from '../hooks/useBtcBalance';
import usePrice from '../hooks/usePrice';
import { ReduxContext } from '../redux/store';
import './Balance.css';

interface BalanceProps {
	account: string | null | undefined;
}

export default function Balance(props: BalanceProps) {
	const redux: any = useContext(ReduxContext);

	const [usdBalance, setUsdBalance] = useState<number | null>(null);
	//const [btcBalance, setBtcBalance] = useState<number | null>(2.30346421);

	const { btcPriceInUsd } = usePrice();
	const { btcBalance } = useBtcBalance(redux.state.network, props.account);

	useEffect(() => {
		if (!!btcPriceInUsd && !!btcBalance) {
			setUsdBalance(btcPriceInUsd * btcBalance);
		}
	}, [btcBalance, btcPriceInUsd]);

	return (
		<div className='balance'>
			<h3 className='balance'>Total balance</h3>
			<h1>{btcBalance} BTC</h1>
			<h2 className='balance'>${usdBalance}</h2>
		</div>
	);
}
