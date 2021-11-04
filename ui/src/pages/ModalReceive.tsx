import React from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode.react';
import Button from '../components/Button';
import './ModalReceive.css';
import '../components/Input.css';

interface ModalReceiveProps {
	isVisible: boolean;
	hideModal: Function;
	address: string;
}

export default function ModalReceive(props: ModalReceiveProps) {
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
								<p style={{ color: '#324168', fontSize: 18 }}>Receive BTC</p>
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
								display: 'flex',
								justifyContent: 'center',
							}}>
							<div
								style={{
									backgroundColor: 'white',
									height: '150px',
									width: '150px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '15px',
									border: '1px solid #dbe1f0',
									marginTop: '50px',
									marginBottom: '30px',
								}}>
								<QRCode value={props.address} />
							</div>
						</div>

						<input
							className='input'
							type='text'
							value={props.address}
							readOnly={true}
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
						<Button
							text='Share address'
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
