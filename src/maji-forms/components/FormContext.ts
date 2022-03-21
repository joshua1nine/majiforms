import { createContext } from 'react';

interface FormContextInt {
	errors: any;
	setErrors: any;
	validationSchema: any;
	setValidationSchema: any;
	spin: boolean;
	setSpin: React.Dispatch<React.SetStateAction<boolean>>;
	onBlur: any;
	formValues: {};
	setFormValues: React.Dispatch<React.SetStateAction<object>>;
}

// Form State Context
export const FormContext = createContext<FormContextInt>(null!);
