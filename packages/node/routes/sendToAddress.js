require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, WalletClient } = require('bcoin');

router.post('/', async (req, res) => {
	const network = Network.get(req.body.network);

	const walletOptions = {
		network: network.type,
		port: network.walletPort,
		apiKey: process.env.API_KEY,
	};

	const walletClient = new WalletClient(walletOptions);

	const comment = 'ignored';
	const comment_to = 'ignored';
	const subtractFee = true;

	const result = await walletClient.execute('sendtoaddress', [
		req.body.account,
		req.body.amount,
		comment,
		comment_to,
		subtractFee,
	]);

	res.send({ txId: result });
});

module.exports = router;
