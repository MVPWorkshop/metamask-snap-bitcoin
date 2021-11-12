require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, WalletClient } = require('bcoin');

router.post('/', async (req, res) => {
	const network = Network.get(req.body.network);
	// const network = Network.get('main');

	const walletOptions = {
		network: network.type,
		port: network.walletPort,
		apiKey: process.env.API_KEY,
	};

	const walletClient = new WalletClient(walletOptions);

	await walletClient.execute('importaddress', [req.body.address]);
	const result = await walletClient.execute('getbalance');

	res.send({ balance: result });
});

module.exports = router;
