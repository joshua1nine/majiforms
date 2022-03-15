import omit from 'just-omit';

type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	errors?: {};
	setErrors?: any;
	validation?: any;
};

const Text = (props: Props) => {
	const {
		name,
		label,
		required = false,
		description = '',
		errors = {},
		setErrors,
		validation,
	} = props;

	const handleBlur = async (e: { target: { value: any } }) => {
		let value = e.target.value;
		let val = validation?.fields[name];

		val &&
			val
				.validate(value)
				.then(() => {
					const newErrors = omit(errors, [name]);
					setErrors && setErrors(newErrors);
				})
				.catch((err: { message: any }) => {
					setErrors &&
						setErrors((current: any) => ({ ...current, [name]: err.message }));
				});
	};

	return (
		<div className='mb-3'>
			<label>
				<span
					className={`block py-2 px-0 text-lg ${
						errors[name] ? 'text-red-600' : ''
					}`}>
					{label} <span className={'text-red-600'}>{required && '*'}</span>
				</span>
				<span>{description}</span>
				<input
					className={`block w-full p-3 pr-4 rounded border border-gray-700 ${
						errors[name]
							? 'border-2 border-red-600 bg-red-100 outline-none'
							: ''
					}`}
					type='text'
					name={name}
					required={required}
					onBlur={handleBlur}
				/>
			</label>
			{errors[name] && (
				<span className='text-red-600 block text-lg mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};

export { Text };
