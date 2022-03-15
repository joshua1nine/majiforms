import { useState, useRef } from 'react';
import { convertArrayToObject } from './convertArrayToObject';
import { toJSON } from './toJSON';

interface Options {
	validation?: any;
	submitType?: string;
	action?: string;
}

export const useMajiForm = (options: Options) => {
	// Options
	const validation = options.validation || 'none';
	const submitType = options.submitType || 'console';
	const action = options.action || 'api/email';

	// Errors
	const [errors, setErrors] = useState({});

	// Ref
	const formRef = useRef<HTMLFormElement>(null!);

	// Submit Spin
	const [spin, setSpin] = useState(false);

	// Submit Logic
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const formData = new FormData(formRef.current);
		const formFields: any = toJSON(formData);
		setSpin(true);

		// Skip validation and send to console
		if (submitType == 'console' && validation == 'none') {
			console.log(formFields);
			setTimeout(() => setSpin(false), 2000);
		} else {
			options.validation
				.validate(formFields, { abortEarly: false })
				.then(async () => {
					setErrors({});
					// Send to console
					if (submitType == 'console') {
						console.log(formFields);
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
					let errors = convertArrayToObject(err.inner);
					setErrors(errors);
				});
		}
	};

	return { errors, setErrors, formRef, handleSubmit, spin };
};
