import styles from './FileUpload.module.css';
import { FaRegFileAlt } from 'react-icons/fa';
import omit from 'just-omit';
import { DragEvent, Key, useRef, useState } from 'react';
import * as yup from 'yup';

interface Props {
	name: string;
	label: string;
	reg: any;
	multiple?: boolean;
	accept?: string;
}

export const FileUpload = ({ name, label, reg, multiple, accept }: Props) => {
	const { onBlur, schema, errors, setErrors } = reg;

	// Check validation schema for required test
	const required = schema?.fields[name]?.exclusiveTests?.required || false;

	/* ---- State ---- */
	const [dropZone, setDropZone] = useState(styles.dropZone);
	const [value, setValue] = useState<any>([]);

	/* ---- Refs ---- */
	const hiddenFileInput = useRef<any>(null!);

	/* ---- Events ---- */
	const handleAppClick = () => {
		hiddenFileInput?.current?.click();
	};

	const handleAppChange = async (e: {
		preventDefault: () => void;
		target: { files: any };
	}) => {
		e.preventDefault();
		setValue([]);
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
		setDropZone(styles.dropEnter);
	};
	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(styles.dropZone);
	};
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(styles.dropEnter);
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDropZone(styles.dropZone);
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

	/* ---- Validation ---- */
	// const fileSchema = yup
	// 	.mixed()
	// 	.test('required', 'Required', (value) => value !== undefined)
	// 	.test('file-size', 'Cannot be more than 2MB', (value) => {
	// 		if (value === undefined) return true; // attachment is optional
	// 		return value.size <= 2000000;
	// 	});

	/* ---- Template ---- */
	return (
		<div className={styles.wrap}>
			<label>
				<span className={styles.label}>
					{label} <span className='text-red-600'>{required && '*'}</span>
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
				className={dropZone}
				onDrop={(e) => handleDrop(e)}
				onDragOver={(e) => handleDragOver(e)}
				onDragEnter={(e) => handleDragEnter(e)}
				onDragLeave={(e) => handleDragLeave(e)}
				onClick={handleAppClick}>
				<FaRegFileAlt
					className={
						dropZone === styles.dropEnter
							? styles.dropEnterIcon
							: styles.dropZoneIcon
					}
				/>
				<p className={styles.dropMessage}>
					Drop your application here, or <span>browse</span>
				</p>
				{accept && (
					<span className={styles.acceptText}>Supports: {accept}</span>
				)}
			</div>
			{value.length > 0 &&
				value.map((file: any, index: Key | null | undefined) => {
					return (
						<div key={index} className={styles.filePrev}>
							<FaRegFileAlt />
							<span>{file.name}</span>
						</div>
					);
				})}
			{errors[name] && <span className={styles.errorMsg}>{errors[name]}</span>}
		</div>
	);
};
