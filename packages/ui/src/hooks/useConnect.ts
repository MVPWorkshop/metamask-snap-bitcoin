import { useState } from 'react';

const useConnect = (snapId: string) => {
	const [error, setError] = useState<string | null>(null);

	const connect = async () => {
		if ((window as any).ethereum) {
			try {
				await (window as any).ethereum.request({
					method: 'wallet_enable',
					params: [
						{
							wallet_plugin: { [snapId]: {} },
						},
					],
				});
			} catch (error: any) {
				setError(error?.message);
			}
		} else {
			setError('Metamask is not installed');
		}
	};

	return { connect, error };
};

export default useConnect;
