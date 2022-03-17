import { useState, useRef, useEffect } from 'react';
import { convertArrayToObject } from './convertArrayToObject';
import { toJSON } from './toJSON';
import omit from 'just-omit';
import { object } from 'yup';

interface Options {
	validation?: boolean;
	submitType?: string;
	action?: string;
}

export const useMajiForm = (options: Options) => {
	// Options
	const validation = options.validation || false;
	const submitType = options.submitType || 'console';
	const action = options.action || 'api/email';

	const [validationSchema, setValidationSchema] = useState(object({}));

	// Errors
	const [errors, setErrors] = useState({});

	// Ref
	const formRef = useRef<HTMLFormElement>(null!);

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

	// Submit Spin
	const [spin, setSpin] = useState(false);

	// Submit Logic
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		for (const field of formData.values()) {
			console.log(field);
		}
		const formFields: any = toJSON(formData);
		setSpin(true);

		// Skip validation and send to console
		if (submitType == 'console' && validation == false) {
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

	const reg = {
		onBlur,
		validationSchema,
		setValidationSchema,
		errors,
		setErrors,
	};

	return { errors, formRef, handleSubmit, spin, reg };
};
