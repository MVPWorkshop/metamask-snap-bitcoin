require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, NodeClient } = require('bcoin');

router.post('/', async (req, res) => {
	const numberOfBlockConfirmations = req.body.blocks;

	const network = Network.get(req.body.network);

	const clientOptions = {
		network: network.type,
		port: network.rpcPort,
		apiKey: process.env.API_KEY,
	};

	const client = new NodeClient(clientOptions);

	const result = await client.estimateFee(numberOfBlockConfirmations);

	res.send({ fee: result });
});

module.exports = router;
