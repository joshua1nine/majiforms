import React from 'react'
import styles from './FileUpload.module.css'
import { FaRegFileAlt } from 'react-icons/fa'
import omit from 'just-omit'
import { useRef, useState } from 'react'
import * as yup from 'yup'

export const FileUpload = ({
  name,
  label,
  errors,
  setErrors,
  required,
  validation,
  multiple,
  accept
}) => {
  /* ---- State ---- */
  const [dropZone, setDropZone] = useState(styles.dropZone)
  const [value, setValue] = useState([])

  console.log(value)

  /* ---- Events ---- */
  const handleAppClick = (e) => {
    hiddenFileInput.current.click()
  }

  const handleAppChange = async (e) => {
    e.preventDefault()
    setValue([])
    const files = e.target.files
    for (const file of files) {
      fileSchema
        .validate(file)
        .then(() => {
          const newErrors = omit(errors, [name])
          setErrors && setErrors(newErrors)
          setValue((current) => [...current, file])
        })
        .catch((err) => {
          setValue([])
          setErrors &&
            setErrors((current) => ({ ...current, [name]: err.message }))
        })
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDropZone(styles.dropEnter)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDropZone(styles.dropZone)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDropZone(styles.dropEnter)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDropZone(styles.dropZone)
    let file = e.dataTransfer.files[0]
    fileSchema
      .validate(file)
      .then(() => {
        const newErrors = omit(errors, [name])
        setErrors(newErrors)
        setValue(file)
      })
      .catch((err) => {
        console.log(err)
        setErrors((values) => ({
          ...values,
          [name]: err.errors[0]
        }))
      })
  }

  /* ---- Refs ---- */
  const hiddenFileInput = useRef(null)

  /* ---- Validation ---- */
  const fileSchema = yup
    .mixed()
    .test('required', 'Required', (value) => value !== undefined)
    .test('file-size', 'Cannot be more than 2MB', (value) => {
      if (value === undefined) return true // attachment is optional
      console.log('Val', value)
      return value.size <= 2000000
    })

  /* ---- Template ---- */
  return (
    <div className={styles.wrap}>
      <label>
        <span className={styles.label}>
          {label} <span>*</span>
        </span>
        <input
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          type='file'
          name={name}
          onChange={handleAppChange}
          onBlur={handleAppChange}
          required={required}
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
        onClick={handleAppClick}
      >
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
        value.map((file, index) => {
          return (
            <div key={index} className={styles.filePrev}>
              <FaRegFileAlt />
              <span>{file.name}</span>
            </div>
          )
        })}
      {errors[name] && <span className={styles.errorMsg}>{errors[name]}</span>}
    </div>
  )
}
