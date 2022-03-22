import { useEffect, useContext, useState } from 'react';
import { array, string, mixed } from 'yup';
import { FormContext } from '../FormContext';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	options: { id: string; label: string; value: string }[];
	layout?: 'vertical' | 'horizontal';
	min?: number;
	max?: number;
};

export const CheckboxGroup = (props: Props) => {
	// Props
	const {
		name,
		label,
		description = '',
		required = false,
		options,
		layout,
		min = 0,
		max = 99,
	} = props;

	// Form Global State
	const {
		errors,
		validationSchema,
		setValidationSchema,
		onBlur,
		setFormValues,
	} = useContext(FormContext);

	const [checkedValues, setCheckedValues] = useState<any>([]);

	// Update field state
	const handleChange = (e: { target: any }) => {
		let box = e.target;
		if (box.checked) {
			setCheckedValues((current: any) => [...current, box.value]);
		} else {
			setCheckedValues(checkedValues.filter((f: any) => f !== box.value));
		}
	};

	useEffect(() => {
		setFormValues((current) => ({
			...current,
			[name]: checkedValues,
		}));
	}, [checkedValues]);

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: array(string())
						.min(min, `Please choose at least ${min}`)
						.max(max, `Maximum of ${max}`),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: array(string())
						.test('noRequireMin', `Please choose at least ${min}`, (value) => {
							console.log(value?.length);
							if (value?.length! !== 0) {
								if (value?.length! < min) {
									return false;
								}
							}
							return true;
						})
						.test('noRequireMax', `Maximum of ${max}`, (value) => {
							console.log(value?.length);
							if (value?.length! !== 0) {
								if (value?.length! > max) {
									return false;
								}
							}
							return true;
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
				<span className='block text-sm -mt-2 pb-1'>{description}</span>
				<div className={layout == 'horizontal' ? 'flex space-x-4' : ''}>
					{options &&
						options.map(({ id, label, value }, index) => {
							return (
								<label
									key={index}
									className='my-2 flex items-center'
									htmlFor={id}>
									<input
										className={`h-5 w-5 text-red focus:ring-red focus:ring-1 focus:ring-offset-1`}
										type='checkbox'
										name={id}
										id={id}
										value={value}
										onChange={handleChange}
										onBlur={onBlur}
									/>
									<span className='pl-2'>{label}</span>
								</label>
							);
						})}
				</div>
			</label>
			{errors && errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
