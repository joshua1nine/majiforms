import { useContext } from 'react';
import { FormContext } from '../FormContext';

export function HoneyPot() {
	const { setFormValues } = useContext(FormContext);

	const handleChange = (e: { target: { name: any; checked: any } }) => {
		setFormValues((values) => ({
			...values,
			[e.target.name]: e.target.checked,
		}));
	};

	return (
		<input
			className='mf-hidden'
			type='checkbox'
			value='1'
			tabIndex={-1}
			autoComplete='off'
			name='winnie'
			onChange={handleChange}
		/>
	);
}
