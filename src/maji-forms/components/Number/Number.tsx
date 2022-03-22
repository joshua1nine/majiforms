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
							: 'border border-gray-700 focus:border-gray-900 focus:ring-gray-900'
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
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
