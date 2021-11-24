import React, { useContext } from 'react';
import { CHANGE_NETWORK } from '../redux/actions/types';
import { ReduxContext } from '../redux/store';
import './Dropdown.css';

interface DropdownProps {
	options: string[];
}

export default function Dropdown(props: DropdownProps) {
	const redux: any = useContext(ReduxContext);

	return (
		<div className='select'>
			<select
				onChange={(ev) =>
					redux.dispatch({ type: CHANGE_NETWORK, payload: ev.target.value })
				}>
				{props.options.map((option) => (
					<option>{option}</option>
				))}
			</select>
			<div className='select_arrow'></div>
		</div>
	);
}
