import React, { useReducer } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { reducer } from './redux/reducers';
import { initialState, ReduxContext } from './redux/store';

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className='App'>
			<ReduxContext.Provider value={{ state, dispatch }}>
				<Dashboard />
			</ReduxContext.Provider>
		</div>
	);
}

export default App;
