type Props = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
	reg?: any;
};

export const Text = (props: Props) => {
	// Variables
	const { name, label, description = '', reg } = props;
	const { onBlur, schema, errors } = reg;

	// Check validation schema for required test
	const required = schema?.fields[name]?.exclusiveTests?.required || false;

	return (
		<div className='mb-3'>
			<label>
				<span
					className={`block py-2 px-0 text-lg ${
						errors[name] ? 'text-red-600' : ''
					}`}>
					{label} <span className='text-red-600'>{required && '*'}</span>
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
					onBlur={onBlur}
				/>
			</label>
			{errors[name] && (
				<span className='text-red-600 block text-lg mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
