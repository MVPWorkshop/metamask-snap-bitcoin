require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Network, NodeClient } = require('bcoin');

/**
 * Getting transaction information by transaction hash
 */
router.post('/txhash', async (req, res) => {
	const txHash = req.body.txHash;

	const network = Network.get(req.body.network);

	const clientOptions = {
		network: network.type,
		port: network.rpcPort,
		apiKey: process.env.API_KEY,
	};

	const client = new NodeClient(clientOptions);

	const result = await client.getTX(txHash);

	res.send({ tx: result });
});

/**
 * Returns transaction objects array by address with support for segwit.
 * The supported address types include p2pkh, p2sh, p2wpkh, and p2wsh.
 * Addresses with hundreds, thousands or millions of transactions, will need to make multiple queries
 * to request all transactions using the after query parameter.
 * If no results are found an empty array will be returned.
 * Results include both confirmed and unconfirmed transactions.
 */
router.post('/address', async (req, res) => {
	const address = req.body.address;

	const network = Network.get(req.body.network);

	const clientOptions = {
		network: network.type,
		port: network.rpcPort,
		apiKey: process.env.API_KEY,
	};

	const client = new NodeClient(clientOptions);

	const result = await client.getTXByAddress(address);

	res.send({ transactions: result });
});

module.exports = router;
