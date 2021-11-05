require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, NodeClient, WalletClient } = require('bcoin');

router.post('/', async (req, res) => {
	const network = Network.get('main');

	const walletOptions = {
		network: network.type,
		port: network.walletPort,
		apiKey: process.env.API_KEY,
	};

	const walletClient = new WalletClient(walletOptions);

	const result = await walletClient.execute('getbalance');
	console.log(result);
});

module.exports = router;
