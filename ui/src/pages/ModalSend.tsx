import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../components/Button';
import '../components/Input.css';

interface ModalSendProps {
	isVisible: boolean;
	hideModal: Function;
	address: string;
}

export default function ModalSend(props: ModalSendProps) {
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [recipientAddress, setRecipientAddress] = useState<string | undefined>(
		undefined
	);
	return props.isVisible
		? createPortal(
				<div className='modalContainer'>
					<div className='modal'>
						<div className='modalHeader'>
							<span
								style={{
									marginLeft: 20,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}>
								<p style={{ color: '#324168', fontSize: 18 }}>Send BTC</p>
								<div
									style={{
										color: 'gray',
										fontSize: 30,
										marginRight: 20,
										cursor: 'pointer',
									}}
									onClick={() => props.hideModal()}>
									&times;
								</div>
							</span>
						</div>
						<div
							style={{
								marginTop: 40,
							}}>
							<span
								style={{
									fontSize: 14,
									color: '#7E94C8',
									fontWeight: 'bold',
								}}>
								Recipient address
							</span>
							<input
								className='input'
								type='text'
								value={recipientAddress}
								onChange={(e) => setRecipientAddress(e.target.value)}
							/>
							<span
								style={{
									fontSize: 10,
									color: '#7E94C8',
									fontWeight: 'bold',
								}}>
								Please send only Bitcoin to this address via BTC (Bitcoin
								Network). Sending other funds or using different network might
								result in permanent loss
							</span>
						</div>
						<div
							style={{
								marginTop: 20,
							}}>
							<span
								style={{
									fontSize: 14,
									color: '#7E94C8',
									fontWeight: 'bold',
								}}>
								From account
							</span>
							{/* <Input value={props.address} readonly={true} /> */}
							<input
								className='input'
								type='text'
								value={props.address}
								readOnly={true}
							/>
						</div>

						<div
							style={{
								marginTop: 20,
							}}>
							<span
								style={{
									fontSize: 14,
									color: '#7E94C8',
									fontWeight: 'bold',
								}}>
								Amount
							</span>
							<input
								className='input'
								type='number'
								value={amount}
								onChange={(e) => setAmount(+e.target.value)}
							/>
						</div>
						<Button
							text='Send BTC'
							onClick={() => navigator.clipboard.writeText(props.address)}
							style={{
								width: '100%',
								height: '10%',
								marginTop: '30px',
								fontSize: 15,
							}}></Button>
						<Button
							text='Back'
							onClick={() => props.hideModal()}
							style={{
								width: '100%',
								height: '10%',
								marginTop: '10px',
								backgroundColor: '#ffffff',
								color: '#4273e1',
								fontSize: 15,
							}}></Button>
					</div>
				</div>,
				document.body
		  )
		: null;
}
