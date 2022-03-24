import { useEffect, useContext } from 'react';
import { string } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export const Email = (props: Props) => {
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
					[name]: string().email('Must be valid email').required('Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: string().email('Must be valid email'),
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
					type='email'
					name={name}
					required={required}
					onBlur={onBlur}
					onChange={handelChange}
				/>
			</label>
			{errors && errors[name] && (
				<span className='mf-mt-1 mf-block mf-text-error'>{errors[name]}</span>
			)}
		</div>
	);
};
