import { useState, useEffect, useContext } from 'react';
import { string } from 'yup';
import { FormContext } from '../FormContext';
import formatPhoneNumber from '../../lib/formatPhoneNumber';

type Props = {
	name: string;
	label: string;
	description?: string;
	required?: boolean;
};

export const Tel = (props: Props) => {
	// Props
	const { name, label, description = '', required = false } = props;

	// Form Global State
	const {
		errors,
		validationSchema,
		setValidationSchema,
		onBlur,
		setFormValues,
	} = useContext(FormContext);

	// State
	const [value, setValue] = useState('');

	const handleChange = (e: { target: any }) => {
		const currentValue = e.target.value;
		let name = e.target.name;
		setFormValues((current) => ({
			...current,
			[name]: formatPhoneNumber(currentValue),
		}));
		setValue(formatPhoneNumber(currentValue));
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: string()
						.min(10, 'Must be a vaild phone number')
						.required('Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: string().min(10, 'Must be a vaild phone number'),
				});
			}
		});
	}, []);

	return (
		<div className='mb-3'>
			<label>
				<span className={`block py-2 px-0 ${errors[name] ? 'text-error' : ''}`}>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`block w-full p-3 pr-4 rounded ${
						errors[name]
							? 'border-2 border-red bg-red-100 outline-none'
							: 'border border-gray-700'
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
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
