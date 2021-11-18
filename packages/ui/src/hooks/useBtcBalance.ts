import { useState } from 'react';
import { Network } from '../types';

const useBtcBalance = (
	network: Network,
	account: string | null | undefined
) => {
	const [balance, setBalance] = useState<number | null | undefined>(null);

	(async () => {
		if (account) {
			const response = await fetch(
				`${process.env.REACT_APP_BTC_NODE_ENDPOINT}/getBalance`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						network: network,
						account: account,
					}),
				}
			);

			const body = await response.json();
			setBalance(body.balance);
		}
	})();

	return { btcBalance: balance };
};

export default useBtcBalance;
