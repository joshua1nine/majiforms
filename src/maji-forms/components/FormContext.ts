import { createContext } from 'react';

interface FormContextInt {
	errors: {};
	setErrors: {};
	validationSchema: any;
	setValidationSchema: any;
	spin: boolean;
	setSpin: React.Dispatch<React.SetStateAction<boolean>>;
	onBlur: any;
}

// Form State Context
export const FormContext = createContext<FormContextInt>(null!);
