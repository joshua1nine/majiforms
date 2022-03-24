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
				<div className={layout == 'horizontal' ? 'mf-flex mf-space-x-4' : ''}>
					{options.map(({ label, id, value }, index) => {
						return (
							<label
								key={index}
								className='mf-my-2 mf-flex mf-items-center'
								htmlFor={id}>
								<input
									className={`mf-h-4 mf-w-4 mf-text-red focus:mf-ring-red focus:mf-ring-opacity-30 focus:mf-ring-offset-0`}
									type='radio'
									name={name}
									id={id}
									onChange={handleChange}
									onBlur={onBlur}
									value={value}
								/>
								<span className='mf-pl-2'>{label}</span>
							</label>
						);
					})}
				</div>
			</label>

			{errors && errors[name] && (
				<span className='mf-mt-1 mf-block mf-text-error'>{errors[name]}</span>
			)}
		</div>
	);
};
