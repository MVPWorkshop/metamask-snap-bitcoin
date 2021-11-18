import { Network } from '../../types';
import { CHANGE_NETWORK } from '../actions/types';

export interface RootState {
	network: Network;
}

export interface Action {
	type: string;
	payload: any;
}

export const reducer = (state: RootState, action: Action): RootState => {
	switch (action.type) {
		case CHANGE_NETWORK:
			return { ...state, network: action.payload };
		default:
			return state;
	}
};
