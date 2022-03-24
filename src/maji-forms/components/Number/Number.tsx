import { useEffect, useContext, useState } from 'react';
import { mixed } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	min?: number;
	max?: number;
	step?: number;
	value?: number;
};

export const Number = (props: Props) => {
	// Props
	const {
		name,
		label,
		description = '',
		required = false,
		min = 0,
		max = 9999,
		step,
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
		// setValue(value);
		let name = e.target.name;
		setFormValues((current) => ({ ...current, [name]: value }));
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: mixed()
						.test('required', 'Required', (value) => {
							if (value === '') {
								return false;
							}
							return true;
						})
						.test('min', `Minimum of ${min}`, (value) => {
							return value >= min;
						})
						.test('max', `Maximum of ${max}`, (value) => {
							return value <= max;
						}),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: mixed()
						.test('min', `Minimum of ${min}`, (value) => {
							if (value === undefined) {
								return true;
							} // optional
							return value >= min;
						})
						.test('max', `Maximum of ${max}`, (value) => {
							if (value === undefined) {
								return true;
							} // optional
							return value <= max;
						}),
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
							: 'mf-border mf-border-gray-700 focus:mf-border-gray-900 focus:mf-ring-gray-900'
					}`}
					type='number'
					name={name}
					required={required}
					onBlur={onBlur}
					onChange={handelChange}
					min={min}
					max={max}
					step={step}
				/>
			</label>
			{errors && errors[name] && (
				<span className='mf-mt-1 mf-block mf-text-error'>{errors[name]}</span>
			)}
		</div>
	);
};
