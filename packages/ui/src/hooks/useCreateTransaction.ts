import { useState } from 'react';
import { Network } from '../types';

const useCreateTransaction = (snapId: string) => {
	const [error, setError] = useState<string | null>(null);

	const createTransaction = async (
		network: Network,
		receiver: string,
		amount: number,
		blockConfirmations: number
	) => {
		try {
			const response = await (window as any).ethereum.request({
				method: 'wallet_invokePlugin',
				params: [
					snapId,
					{
						method: 'createTransaction',
						params: [network, receiver, amount, blockConfirmations],
					},
				],
			});

			const transactionId = JSON.stringify(response);
			return transactionId;
		} catch (error: any) {
			setError(error?.message);
		}
	};

	return { createTransaction, error };
};

export default useCreateTransaction;
