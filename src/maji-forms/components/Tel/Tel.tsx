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
		<div className='mf-mb-3'>
			<label>
				<span
					className={`mf-block mf-py-2 mf-px-0 ${
						errors && errors[name] ? 'mf-text-error' : ''
					}`}>
					{label} <span className='mf-text-error'>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`mf-block mf-w-full mf-rounded mf-p-3 mf-pr-4  ${
						errors && errors[name]
							? 'mf-border-2 mf-border-red mf-bg-red-100 mf-outline-none focus:mf-border-red focus:mf-ring-0'
							: 'mf-border mf-border-gray-700 focus:mf-border-gray-900 focus:mf-ring-gray-900 '
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
			{errors && errors[name] && (
				<span className='mf-mt-1 mf-block mf-text-error'>{errors[name]}</span>
			)}
		</div>
	);
};
