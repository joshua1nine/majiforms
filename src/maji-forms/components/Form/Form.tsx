import { useState, useMemo } from 'react';
import { object } from 'yup';
import { convertArrayToObject } from '../../lib/convertArrayToObject';
import omit from 'just-omit';
import { FormContext } from '../FormContext';

interface Props {
	children: React.ReactNode;
	validation?: 'on' | 'off'; // Default is 'on'
	submitType?: 'console' | 'multipart/form-data' | 'application/json';
	action?: string;
}

export const Form = ({
	children,
	validation = 'on',
	submitType = 'console',
	action = 'api/email',
}: Props) => {
	// Validation
	const [validationSchema, setValidationSchema] = useState(object({}));

	// Errors
	const [errors, setErrors] = useState({});

	// Form Values
	const [formValues, setFormValues] = useState({});

	// Submit Spin
	const [spin, setSpin] = useState(false);

	// Validate onBlur
	const onBlur = async (e: {
		target: { value: any; name: string; attributes: any };
	}) => {
		let value = e.target.value;
		let name = e.target.name;
		let val = validationSchema?.fields[name];

		if (val) {
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

			return val;
		}
	};

	// Submit Logic
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setSpin(true);

		// Skip validation and send to console
		if (submitType == 'console' && validation == 'off') {
			console.log(formValues);
			setTimeout(() => setSpin(false), 2000);
		} else {
			validationSchema
				.validate(formValues, { abortEarly: false })
				.then(async () => {
					setErrors({});
					// Send to console
					if (submitType == 'console') {
						console.log(formValues);
						setTimeout(() => setSpin(false), 2000);
					}

					if (submitType === 'application/json') {
						try {
							// Send to api
							let res = await fetch(action, {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(formValues),
							});

							// Data Response
							if (res.status === 200) {
								setSpin(false);
							}
						} catch (error) {
							console.log(error);
						}
					}
				})
				.catch((err: { inner: any[] }) => {
					setSpin(false);
					let errors = convertArrayToObject(err.inner);
					setErrors(errors);
				});
		}
	};

	// Pass to forms global state
	const value = useMemo(
		() => ({
			errors,
			setErrors,
			validationSchema,
			setValidationSchema,
			spin,
			setSpin,
			onBlur,
			formValues,
			setFormValues,
		}),
		[
			errors,
			validationSchema,
			spin,
			onBlur,
			setErrors,
			formValues,
			setFormValues,
		]
	);

	return (
		<FormContext.Provider value={value}>
			<form onSubmit={handleSubmit} noValidate>
				{children}
			</form>
		</FormContext.Provider>
	);
};
