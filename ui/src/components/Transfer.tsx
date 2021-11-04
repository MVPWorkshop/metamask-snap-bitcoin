import React from 'react';
import { useReceiveModal, useSendModal } from '../hooks/useModal';
import ModalReceive from '../pages/ModalReceive';
import ModalSend from '../pages/ModalSend';
import Button from './Button';
import './Transfer.css';

export default function Transfer() {
	const { isReceiveVisible, toggleReceiveModal } = useReceiveModal();
	const { isSendVisible, toggleSendModal } = useSendModal();
	return (
		<div className='transfer'>
			<Button text='Receive' onClick={toggleReceiveModal} />
			<Button text='Send' onClick={toggleSendModal} />
			<ModalReceive
				isVisible={isReceiveVisible}
				hideModal={toggleReceiveModal}
				address={'bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6'}
			/>
			<ModalSend
				isVisible={isSendVisible}
				hideModal={toggleSendModal}
				address={'bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6'}
			/>
		</div>
	);
}
