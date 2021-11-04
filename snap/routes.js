const getBalanceRoute = `${process.env.BTC_NODE_ENDPOINT}/getbalance`;
const sendToAddressRoute = `${process.env.BTC_NODE_ENDPOINT}/sendtoaddress`;
const estimateFeeRoute = `${process.env.BTC_NODE_ENDPOINT}/estimatefee`;
const broadcastRoute = `${process.env.BTC_NODE_ENDPOINT}/broadcast`;

module.exports = {
	getBalanceRoute: getBalanceRoute,
	sendToAddressRoute: sendToAddressRoute,
	estimateFeeRoute: estimateFeeRoute,
	broadcastRoute: broadcastRoute,
};
