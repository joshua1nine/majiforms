import { FaRegFileAlt, FaImage } from 'react-icons/fa';
import { DragEvent, Key, useContext, useRef, useState, useEffect } from 'react';
import { FormContext } from '../FormContext';
import { mixed, number, string, object } from 'yup';

interface Props {
	name: string;
	label: string;
	multiple?: boolean;
	required?: boolean;
	accept?: string;
}

export const File = ({ name, label, multiple, accept, required }: Props) => {
	// Form Global State
	const {
		errors,
		validationSchema,
		setValidationSchema,
		setErrors,
		setFormValues,
	} = useContext(FormContext);

	/* ---- State ---- */
	const [dropZone, setDropZone] = useState(false);
	const [value, setValue] = useState<any>([]);

	/* ---- Refs ---- */
	const hiddenFileInput = useRef<any>(null!);

	/* ---- Events ---- */
	const handleAppClick = () => {
		hiddenFileInput?.current?.click();
	};

	// Set Validation
	useEffect(() => {
		setValidationSchema((values: { fields: any }) => {
			if (required) {
				return validationSchema.shape({
					...values.fields,
					[name]: mixed().test('required', 'Required', (value) => {
						return value.size > 0;
					}),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: object({
						name: string(),
						size: number(),
						type: string(),
						data: string(),
					}),
				});
			}
		});
	}, []);

	const handleAppChange = async (e: {
		preventDefault: () => void;
		target: { files: any };
	}) => {
		e.preventDefault();

		// Clear out value
		setValue([]);

		// Clear out errors
		setErrors([]);

		// Create accept array to validate type with
		let fileTypes = accept?.replaceAll('.', '')?.split(',');

		// Grab files and check each file
		const files = e.target.files;

		for (const file of files) {
			if (file.size <= 2000000) {
				if (fileTypes?.includes(file.type.split('/')[1])) {
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function () {
						let base64data = reader.result || '';

						let fileObj = {
							name: file.name,
							size: file.size,
							type: file.type,
							data: base64data,
						};
						setValue((current: any[]) => [...current, fileObj]);
					};
				} else {
					setErrors &&
						setErrors((current: any[]) => ({
							...current,
							[name]: `File type ${file.type} not supported`,
						}));
				}
			} else {
				setErrors &&
					setErrors((current: any[]) => ({
						...current,
						[name]: 'File cannot be more than 2MB',
					}));
			}
		}
	};

	useEffect(() => {
		if (value.length > 0) {
			if (multiple) {
				setFormValues((current) => ({
					...current,
					[name]: value,
				}));
			} else {
				setFormValues((current) => ({
					...current,
					[name]: value[0],
				}));
			}
		}
	}, [value]);

	const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(true); // enter styles
	};
	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(false); // default styles
	};
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(true); // enter styles
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(false); // defualt styles
		let files = e.dataTransfer.files;

		for (const file of files) {
			if (file.size <= 2000000) {
				if (multiple) {
					setValue((current: any[]) => [...current, file]);
				} else {
					setValue([file]);
				}
			} else {
				setErrors &&
					setErrors((current: any[]) => ({
						...current,
						[name]: 'File cannot be more than 2MB',
					}));
			}
		}
	};

	/* ---- Template ---- */
	return (
		<div className='mb-3'>
			<label
				className={`block py-2 px-0 ${
					errors && errors[name] ? 'text-error' : ''
				}`}>
				<span>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<input
					ref={hiddenFileInput}
					style={{ display: 'none' }}
					type='file'
					name={name}
					onChange={handleAppChange}
					accept={accept}
					multiple={multiple}
				/>
			</label>
			<div
				className={`flex flex-col rounded items-center justify-center border-2 border-dashed bg-white py-7 px-3 cursor-pointer ${
					dropZone || (errors && errors[name])
						? 'border-red'
						: 'border-gray-700'
				}`}
				onDrop={(e) => handleDrop(e)}
				onDragOver={(e) => handleDragOver(e)}
				onDragEnter={(e) => handleDragEnter(e)}
				onDragLeave={(e) => handleDragLeave(e)}
				onClick={handleAppClick}>
				<FaRegFileAlt
					className={
						dropZone
							? 'mb-4 text-4xl text-red animate-bounce-rev'
							: 'mb-4 text-4xl text-gray-700 transition-all'
					}
				/>
				<p className='m-0'>
					Drop your application here, or{' '}
					<span className='cursor-pointer font-bold hover:text-red'>
						browse
					</span>
				</p>
				{accept && (
					<span className='text-sm text-gray-700'>Supports: {accept}</span>
				)}
			</div>
			{value.length > 0 &&
				value.map((file: any, index: Key | null | undefined) => {
					return (
						<div
							key={index}
							className='mt-2 flex items-center justify-between border border-gray-700 rounded p-3'>
							<div className='flex items-center'>
								{file?.type?.includes('image/') ? (
									<FaImage className='mr-3 text-2xl text-red' />
								) : (
									<FaRegFileAlt className='mr-3 text-2xl text-red' />
								)}
								<span className='m-0'>{file.name}</span>
							</div>
						</div>
					);
				})}
			{errors && errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
