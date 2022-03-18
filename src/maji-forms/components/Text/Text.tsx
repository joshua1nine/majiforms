import { useEffect, useContext } from 'react';
import { string } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export const Text = (props: Props) => {
	// Props
	const { name, label, description = '', required = false } = props;

	// Form Global State
	const { errors, validationSchema, setValidationSchema, onBlur } =
		useContext(FormContext);

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
				<span className={`block py-2 px-0 ${errors[name] ? 'text-error' : ''}`}>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`block w-full p-3 pr-4 rounded  ${
						errors[name]
							? 'border-2 border-red bg-red-100 outline-none'
							: 'border border-gray-700'
					}`}
					type='text'
					name={name}
					required={required}
					onBlur={onBlur}
				/>
			</label>
			{errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
