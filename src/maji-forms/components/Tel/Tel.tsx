import { useState, useEffect } from 'react';
import { string } from 'yup';
import formatPhoneNumber from '../../lib/formatPhoneNumber';

type Props = {
	name: string;
	label: string;
	description?: string;
	required?: boolean;
	reg?: any;
};

export const Tel = (props: Props) => {
	// Variables
	const { name, label, description = '', reg, required = false } = props;
	const { onBlur, validationSchema, setValidationSchema, errors } = reg;

	// State
	const [value, setValue] = useState('');

	const handleChange = (e: { target: any }) => {
		const currentValue = e.target.value;
		setValue(formatPhoneNumber(currentValue));
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: string().required('Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: string(),
				});
			}
		});
	}, []);

	return (
		<div className='mb-3'>
			<label>
				<span
					className={`block py-2 px-0 text-lg ${
						errors[name] ? 'text-red-600' : ''
					}`}>
					{label} <span className='text-red-600'>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`block w-full p-3 pr-4 rounded border border-gray-700 ${
						errors[name]
							? 'border-2 border-red-600 bg-red-100 outline-none'
							: ''
					}`}
					type='tel'
					maxLength={10}
					name={name}
					value={value}
					placeholder='(123) 456-7891'
					onChange={handleChange}
					onBlur={onBlur}
					required={required}
				/>
			</label>
			{errors[name] && (
				<span className='text-red-600 block text-lg mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
