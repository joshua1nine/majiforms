import { useRef, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import * as yup from 'yup';
import { omit } from '../lib/omit';

const FileUpload = ({
  errors,
  name,
  label,
  value,
  setValue,
  setErrors,
  wrap,
  required,
  accept,
}) => {
  /* ---- State ---- */
  const [dropZone, setDropZone] = useState('drop-zone');

  /* ---- Events ---- */
  const handleAppClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleAppChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    fileSchema
      .validate(file)
      .then(() => {
        const newErrors = omit(errors, [name]);
        setErrors(newErrors);
        setValue(file);
      })
      .catch((err) => {
        console.log(err);
        setErrors((values) => ({
          ...values,
          [name]: err.errors[0],
        }));
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone('drop-enter');
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone('drop-zone');
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone('drop-enter');
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone('drop-zone');
    let file = e.dataTransfer.files[0];
    fileSchema
      .validate(file)
      .then(() => {
        const newErrors = omit(errors, [name]);
        setErrors(newErrors);
        setValue(file);
      })
      .catch((err) => {
        console.log(err);
        setErrors((values) => ({
          ...values,
          [name]: err.errors[0],
        }));
      });
  };

  /* ---- Refs ---- */
  const hiddenFileInput = useRef(null);

  /* ---- Validation ---- */
  const fileSchema = yup
    .mixed()
    .test('required', 'Required', (value) => value !== undefined)
    .test('file-size', 'Cannot be more than 2MB', (value) => {
      if (value === undefined) return true; // attachment is optional
      return value.size <= 2000000;
    });

  /* ---- Template ---- */
  return (
    <div className={`maji-wrap ${wrap}`}>
      <label>
        <span className='maji-label'>
          {label} <span className='text-error-700'>*</span>
        </span>
        <input
          ref={hiddenFileInput}
          className='hidden'
          type='file'
          name={name}
          onChange={handleAppChange}
          required={required}
          accept={accept}
        />
      </label>
      <div
        className={dropZone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onClick={handleAppClick}
      >
        <FaFilePdf
          className={
            dropZone === 'drop-enter'
              ? 'bounce mb-4 text-[38px] text-red transition-all'
              : 'mb-4 text-[38px] text-red transition-all'
          }
        />
        <p className='m-0'>
          Drop your application here, or{' '}
          <span className='cursor-pointer font-bold hover:text-red'>
            browse
          </span>
        </p>
        <span className='text-[14px] text-gray-400'>Supports: {accept}</span>
      </div>
      {value !== undefined && (
        <div className='mt-[8px] flex items-center space-x-3 rounded-md border border-gray-400 p-[12px] shadow'>
          <FaFilePdf className='text-[24px] text-red' />
          <span className='m-0 text-black'>{value.name}</span>
        </div>
      )}
      {errors[name] && <span className='maji-error'>{errors[name]}</span>}
    </div>
  );
};

export default FileUpload;
