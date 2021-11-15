import { useState } from 'react';

const useModal = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleModal = () => {
		setIsVisible(!isVisible);
		console.log(!isVisible, 'ovdee');
	};

	return { isVisible, toggleModal };
};

export default useModal;

export function useReceiveModal() {
	const { isVisible, toggleModal } = useModal();

	const isReceiveVisible: boolean = isVisible;
	const toggleReceiveModal: Function = toggleModal;

	return { isReceiveVisible, toggleReceiveModal };
}

export function useSendModal() {
	const { isVisible, toggleModal } = useModal();

	const isSendVisible: boolean = isVisible;
	const toggleSendModal: Function = toggleModal;

	return { isSendVisible, toggleSendModal };
}
