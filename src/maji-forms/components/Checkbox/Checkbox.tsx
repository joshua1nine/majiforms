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
		<div className='mf-mb-3'>
			<label>
				<span
					className={`mf-block mf-py-2 mf-px-0 ${
						errors && errors[name] ? 'mf-text-error' : ''
					}`}>
					{label} <span className='mf-text-error'>{required && '*'}</span>
				</span>
				<span className='-mf-mt-2 mf-block mf-pb-1 mf-text-sm'>
					{description}
				</span>
				<input
					className={`mf-h-[20px] mf-w-[20px] mf-text-red focus:mf-ring-1 focus:mf-ring-red focus:mf-ring-offset-1`}
					type='checkbox'
					name={name}
					id={name}
					onChange={handleChange}
					onBlur={onBlur}
				/>
			</label>
			{errors && errors[name] && (
				<span className='mf-mt-1 mf-block mf-text-error'>{errors[name]}</span>
			)}
		</div>
	);
};
