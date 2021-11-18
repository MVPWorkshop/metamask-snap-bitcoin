import { useState } from 'react';

const usePrice = () => {
	const endpoint: string = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`;
	const [price, setPrice] = useState<number | null>(null);

	(async () => {
		const response = await fetch(endpoint);
		const body = await response.json();
		setPrice(body.bitcoin.usd);
	})();

	return { btcPriceInUsd: price };
};

export default usePrice;
