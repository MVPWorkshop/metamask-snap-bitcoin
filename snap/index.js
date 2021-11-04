require('dotenv').config();
const bitcoin = require('bitcoinjs-lib');
const fetch = require('node-fetch');
const routes = require('./routes');

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
	switch (requestObject.method) {
		case 'getAccount':
			return await getAccount(requestObject.params[0]);
		case 'getBalance':
			return await getBalance(requestObject.params[0], requestObject.params[1]);
		case 'createTransaction':
			return await createTransaction(
				requestObject.params[0],
				requestObject.params[1],
				requestObject.params[2],
				requestObject.params[3]
			);
		default:
			throw new Error('Method not found.');
	}
});

async function getAccount(network) {
	// const PRIV_KEY = await wallet.request({
	// 	method: 'snap_getAppKey',
	// });

	// const privateKeyBuffer = Buffer.from(`${PRIV_KEY}`, 'hex');
	// const keyPair = bitcoin.ECPair.fromPrivateKey(privateKeyBuffer);

	const keyPair = _getKeyPair();

	// if (network === 'testnet') {
	// 	const { address } = bitcoin.payments.p2pkh({
	// 		pubkey: keyPair.publicKey,
	// 		network: bitcoin.networks.testnet,
	// 	});
	// 	return address;
	// } else {
	// 	const { address } = bitcoin.payments.p2pkh({
	// 		pubkey: keyPair.publicKey,
	// 		network: bitcoin.networks.bitcoin,
	// 	});
	// 	return address;
	// }
	const address =
		network === 'testnet'
			? _generateAddress(keyPair, bitcoin.networks.testnet)
			: _generateAddress(keyPair, bitcoin.networks.bitcoin);

	return address;
}

async function _generateAddress(_keyPair, _network) {
	const { address } = bitcoin.payments.p2pkh({
		pubkey: _keyPair.publicKey,
		network: _network,
	});
	return address;
}

async function _getKeyPair() {
	const PRIV_KEY = await wallet.request({
		method: 'snap_getAppKey',
	});

	const privateKeyBuffer = Buffer.from(`${PRIV_KEY}`, 'hex');
	const keyPair = bitcoin.ECPair.fromPrivateKey(privateKeyBuffer);

	return keyPair;
}

async function getBalance(_account, _network) {
	const network =
		_network === 'testnet'
			? bitcoin.networks.testnet
			: bitcoin.networks.bitcoin;

	const response = await fetch(routes.getBalanceRoute, {
		method: 'POST',
		account: _account,
		network: network,
	});

	const balance = await response.json();

	return balance;
}

async function _createUtxoToSpend(_amount, _account) {
	const txId = await fetch(routes.sendToAddressRoute, {
		method: 'POST',
		account: _account,
		amount: _amount,
	});

	return txId;
}

async function createTransaction(
	_network,
	_receiver,
	_amount,
	_blockConfirmations
) {
	// const txb = new bitcoin.TransactionBuilder(network);
	// txb.addInput('TX_ID', TX_VOUT);
	// txb.addOutput(p2pkhBob0.address, 5e7); // the actual "spend"
	// txb.addOutput(p2pkhAlice1.address, 499e5); // Alice's change

	// The miner fee is calculated by subtracting the outputs from the inputs.
	// 100 000 000 - (50 000 000 + 49 900 000) = 100 000
	// 100 000 satoshis equals 0,001 BTC, this is the miner fee.

	//creating and signing a standard p2pkh transaction

	const network =
		_network === 'testnet'
			? bitcoin.networks.testnet
			: bitcoin.networks.bitcoin;

	const keyPair = _getKeyPair();

	const sender =
		network === 'testnet'
			? _generateAddress(keyPair, bitcoin.networks.testnet)
			: _generateAddress(keyPair, bitcoin.networks.bitcoin);

	const txBuilder = new bitcoin.TransactionBuilder(network);

	const txId = _createUtxoToSpend(_amount, sender);
	const vout = 0;

	// const PRIV_KEY = await wallet.request({
	// 	method: 'snap_getAppKey',
	// });

	// const privateKeyBuffer = Buffer.from(`${PRIV_KEY}`, 'hex');
	// const keyPair = bitcoin.ECPair.fromPrivateKey(privateKeyBuffer);

	// const estimatedFee = 0;
	const estimatedFee = await fetch(routes.estimateFeeRoute, {
		method: 'POST',
		blockConfirmations: _blockConfirmations,
	});
	const balance = getBalance();

	txBuilder.addInput(txId, vout);
	txBuilder.addOutput(_receiver, _amount);
	txBuilder.addOutput(sender, balance - _amount - estimatedFee);

	txBuilder.sign(0, keyPair);

	const transaction = txBuilder.build();
	const transactionId = transaction.toHex();

	// BROADCAST tx
	await fetch(routes.broadcastRoute, {
		method: 'POST',
		transactionId: transactionId,
	});

	return transactionId;
}
