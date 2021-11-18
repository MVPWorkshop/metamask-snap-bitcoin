import { createContext } from 'react';
import { Network } from '../../types';
import { RootState } from '../reducers';

export const initialState: RootState = {
	network: Network.Bitcoin,
};

export const ReduxContext = createContext({});
