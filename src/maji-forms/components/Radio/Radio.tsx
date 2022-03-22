import { useEffect, useContext } from 'react';
import { string } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	options: { id: string; label: string; value: string }[];
	layout?: 'vertical' | 'horizontal';
};

export const Radio = (props: Props) => {
	// Props
	const {
		name,
		label,
		description = '',
		required = false,
		options,
		layout,
	} = props;

	// Form Global State
	const {
		errors,
		validationSchema,
		setValidationSchema,
		onBlur,
		setFormValues,
	} = useContext(FormContext);

	const handleChange = (e: { target: { value: any; name: any } }) => {
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
					className={`block py-2 px-0 ${
						errors && errors[name] ? 'text-error' : ''
					}`}>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<span className='block text-sm -mt-2 pb-1'>{description}</span>
				<div className={layout == 'horizontal' ? 'flex space-x-4' : ''}>
					{options.map(({ label, id, value }, index) => {
						return (
							<label
								key={index}
								className='my-2 flex items-center'
								htmlFor={id}>
								<input
									className={`h-4 w-4 text-red focus:ring-red focus:ring-opacity-30 focus:ring-offset-0`}
									type='radio'
									name={name}
									id={id}
									onChange={handleChange}
									onBlur={onBlur}
									value={value}
								/>
								<span className='pl-2'>{label}</span>
							</label>
						);
					})}
				</div>
			</label>
			{/* <label>
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
					type='text'
					name={name}
					required={required}
					onBlur={onBlur}
					onChange={handelChange}
				/>
			</label> */}
			{errors && errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
