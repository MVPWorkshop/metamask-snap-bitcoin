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
	const keyPair = _getKeyPair();

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
	const network = _network === 'bitcoin' ? 'main' : 'testnet';

	const response = await fetch(routes.getBalanceRoute, {
		method: 'POST',
		address: _account,
		network: network,
	});

	const result = await response.json();

	return result.balance;
}

async function _createUtxoToSpend(_amount, _account, _network) {
	const network = _network === 'testnet' ? 'testnet' : 'main';

	const response = await fetch(routes.sendToAddressRoute, {
		method: 'POST',
		account: _account,
		amount: _amount,
		network: network,
	});

	const result = await response.json();

	return result.txId;
}

async function createTransaction(
	_network,
	_receiver,
	_amount,
	_blockConfirmations
) {
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

	const txId = _createUtxoToSpend(_amount, sender, _network);
	const vout = 0;

	const response = await fetch(routes.estimateFeeRoute, {
		method: 'POST',
		blocks: _blockConfirmations,
		network: _network === 'bitcoin' ? 'main' : 'testnet',
	});
	const result = await response.json();
	const estimatedFee = result.fee;

	const balance = getBalance();

	txBuilder.addInput(txId, vout);
	txBuilder.addOutput(_receiver, _amount);
	txBuilder.addOutput(sender, balance - _amount - estimatedFee);

	txBuilder.sign(0, keyPair);

	const transaction = txBuilder.build();
	const transactionId = transaction.toHex();

	await fetch(routes.broadcastRoute, {
		method: 'POST',
		txHash: transactionId,
		network: _network === 'bitcoin' ? 'main' : 'testnet',
	});

	return transactionId;
}
