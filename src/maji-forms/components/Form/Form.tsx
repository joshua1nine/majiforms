import { useState, useRef, useMemo } from 'react';
import { object } from 'yup';
import { FormContext } from '../../context/FormContext';
import { convertArrayToObject } from '../../lib/convertArrayToObject';
import { toJSON } from '../../lib/toJSON';
import omit from 'just-omit';
import { Submit } from '../Submit';

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

	// Ref
	const formRef = useRef<HTMLFormElement>(null!);

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
		const formData = new FormData(formRef.current);
		const formFields: any = toJSON(formData);
		setSpin(true);

		// Skip validation and send to console
		if (submitType == 'console' && validation == 'off') {
			console.log(formFields);
			setTimeout(() => setSpin(false), 2000);
		} else {
			validationSchema
				.validate(formFields, { abortEarly: false })
				.then(async () => {
					setErrors({});
					// Send to console
					if (submitType == 'console') {
						console.log(formFields);
						setTimeout(() => setSpin(false), 2000);
					}
					// Send as multipart/from-data
					if (submitType === 'multipart/form-data') {
						console.log('Submit as formData object', formData);
						// Send to api
						let res = await fetch(action, {
							method: 'POST',
							body: formData,
						});

						// Data Response
						let data = await res.json();
						if (data.status) {
							setSpin(false);
						}
						console.log(data);
					}
					// Send as application/json
					if (submitType === 'application/json') {
						console.log('Submit as JSON', formFields);
						// Send to api
						let res = await fetch(action, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: formFields,
						});

						// Data Response
						let data = await res.json();
						console.log(data);
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
		}),
		[errors, validationSchema, spin, onBlur]
	);

	return (
		<FormContext.Provider value={value}>
			<form ref={formRef} onSubmit={handleSubmit} noValidate>
				{children}
			</form>
		</FormContext.Provider>
	);
};
