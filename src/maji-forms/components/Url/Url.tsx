import { useEffect, useContext } from 'react';
import { string } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	placeholder?: string;
};

export const Url = (props: Props) => {
	// Props
	const {
		name,
		label,
		description = '',
		required = false,
		placeholder = 'https://www.website.com',
	} = props;

	// Form Global State
	const {
		errors,
		validationSchema,
		setValidationSchema,
		onBlur,
		setFormValues,
	} = useContext(FormContext);

	const handelChange = (e: { target: { value: any; name: any } }) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormValues((current) => ({ ...current, [name]: value }));
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: string().url('Must be valid url').required('Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: string().url('Must be valid url'),
				});
			}
		});
	}, []);

	return (
		<div className='mb-3'>
			<label>
				<span
					className={`block py-2 px-0 ${
						errors && errors[name] ? 'text-error' : ''
					}`}>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`block w-full p-3 pr-4 rounded  ${
						errors && errors[name]
							? 'border-2 border-red bg-red-100 outline-none focus:border-red focus:ring-0'
							: 'border border-gray-700 focus:border-gray-900 focus:ring-gray-900 '
					}`}
					type='url'
					name={name}
					required={required}
					onBlur={onBlur}
					onChange={handelChange}
					placeholder={placeholder}
				/>
			</label>
			{errors && errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
