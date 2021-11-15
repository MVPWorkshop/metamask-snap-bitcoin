require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, NodeClient } = require('bcoin');

router.post('/', async (req, res) => {
	const txHash = req.body.txHash;

	if (txHash) {
		const network = Network.get(req.body.network);

		const clientOptions = {
			network: network.type,
			port: network.rpcPort,
			apiKey: process.env.API_KEY,
		};

		const client = new NodeClient(clientOptions);

		const result = await client.broadcast(txHash);

		res.send({ result: result });
	}
});

module.exports = router;
