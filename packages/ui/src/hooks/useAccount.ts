import { useState } from 'react';
import { Network } from '../types';

const useAccount = (snapId: string, network: Network) => {
	const [error, setError] = useState<string | null>(null);

	const getAccount = async () => {
		try {
			const response = await (window as any).ethereum.request({
				method: 'wallet_invokePlugin',
				params: [
					snapId,
					{
						method: 'getAccount',
						params: [network],
					},
				],
			});

			const account = JSON.stringify(response);
			return account;
		} catch (error: any) {
			setError(error?.message);
		}
	};

	return { getAccount, error };
};

export default useAccount;
