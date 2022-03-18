import { FaRegFileAlt } from 'react-icons/fa';
import { DragEvent, Key, useContext, useRef, useState, useEffect } from 'react';
import { FormContext } from '../FormContext';
import { object } from 'yup';

interface Props {
	name: string;
	label: string;
	multiple?: boolean;
	required?: boolean;
	accept?: string;
}

export const File = ({ name, label, multiple, accept, required }: Props) => {
	// Form Global State
	const { errors, validationSchema, setValidationSchema, setErrors } =
		useContext(FormContext);

	/* ---- State ---- */
	// const [dropZone, setDropZone] = useState(styles.dropZone);
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
					[name]: object().nullable().required('Required'),
				});
			} else {
				return validationSchema.shape({
					...values.fields,
					[name]: object().nullable(),
				});
			}
		});
	}, []);

	const handleAppChange = async (e: {
		preventDefault: () => void;
		target: { files: any };
	}) => {
		e.preventDefault();
		setValue([]);
		setErrors([]);
		const files = e.target.files;
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
			<label className={`block py-2 px-0 ${errors[name] ? 'text-error' : ''}`}>
				<span>
					{label} <span className='text-error'>{required && '*'}</span>
				</span>
				<input
					ref={hiddenFileInput}
					style={{ display: 'none' }}
					type='file'
					name={name}
					onChange={handleAppChange}
					onBlur={handleAppChange}
					accept={accept}
					multiple={multiple}
				/>
			</label>
			<div
				className={`flex flex-col rounded items-center justify-center border-2 border-dashed bg-white py-7 px-3 cursor-pointer ${
					dropZone || errors[name] ? 'border-red' : 'border-gray-700'
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
							className='mt-2 flex items-center border border-gray-700 rounded p-3'>
							<FaRegFileAlt className='mr-3 text-2xl text-red' />
							<span className='m-0'>{file.name}</span>
						</div>
					);
				})}
			{errors[name] && (
				<span className='text-error block mt-1'>{errors[name]}</span>
			)}
		</div>
	);
};
