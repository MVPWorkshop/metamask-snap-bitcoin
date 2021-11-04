import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
	//const snapId = `http://localhost:8081/package.json`;
	// const connect = async () => {
	// 	if ((window as any).ethereum) {
	// 		await (window as any).ethereum.request({
	// 			method: 'wallet_enable',
	// 			params: [
	// 				{
	// 					wallet_plugin: { [snapId]: {} },
	// 				},
	// 			],
	// 		});
	// 	}
	// };

	// const getAccount = async () => {
	// 	try {
	// 		const response = await (window as any).ethereum.request({
	// 			method: 'wallet_invokePlugin',
	// 			params: [
	// 				snapId,
	// 				{
	// 					method: 'getAccount',
	// 					params: ['testnet'],
	// 				},
	// 			],
	// 		});

	// 		// console.log(networkDropdown.value)

	// 		// alert('received back: ' + JSON.stringify(response))
	// 		const wallet = JSON.stringify(response);
	// 		console.log(wallet);
	// 	} catch (err) {
	// 		console.error(err);
	// 		// alert('Problem happened: ' + err.message || err)
	// 	}
	// };
	return (
		<div className='App'>
			{/* <header className='App-header'>
				<button onClick={() => connect()}>connect</button>
				<button onClick={() => getAccount()}>get</button>
			</header> */}
			<Dashboard />
		</div>
	);
}

export default App;
