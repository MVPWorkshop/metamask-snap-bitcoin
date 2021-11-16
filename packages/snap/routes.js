const getBalanceRoute = `${process.env.BTC_NODE_ENDPOINT}/getBalance`;
const sendToAddressRoute = `${process.env.BTC_NODE_ENDPOINT}/sendToAddress`;
const estimateFeeRoute = `${process.env.BTC_NODE_ENDPOINT}/estimateFee`;
const broadcastRoute = `${process.env.BTC_NODE_ENDPOINT}/executeTransaction`;

module.exports = {
	getBalanceRoute: getBalanceRoute,
	sendToAddressRoute: sendToAddressRoute,
	estimateFeeRoute: estimateFeeRoute,
	broadcastRoute: broadcastRoute,
};
