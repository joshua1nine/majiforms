import { useEffect, useContext } from 'react';
import { boolean } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export const Checkbox = (props: Props) => {
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

	const handleChange = (e: { target: { checked: any; name: any } }) => {
		let value = e.target.checked;
		let name = e.target.name;
		setFormValues((current) => ({
			...current,
			[name]: value,
		}));
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: boolean().required('Required').equals([true], 'Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: boolean(),
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
				<input
					className={`h-[20px] w-[20px] text-red focus:ring-1 focus:ring-red focus:ring-offset-1`}
					type='checkbox'
					name={name}
					id={name}
					onChange={handleChange}
					onBlur={onBlur}
				/>
			</label>
			{errors && errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
