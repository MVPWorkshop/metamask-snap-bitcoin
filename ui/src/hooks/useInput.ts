import { useState } from 'react';

const useInput = (defaultValue: string) => {
	const [value, setValue] = useState(defaultValue);

	function onChange(e: any) {
		setValue(e.target.value);
	}

	return {
		value,
		onChange,
	};
};

export default useInput;
