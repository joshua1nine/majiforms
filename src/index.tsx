import './styles/global.css';
import { Text, Submit, useMajiForm } from './maji-forms/index';
import { object, string } from 'yup';

function Index() {
	const validationSchema = object({
		fname: string().required(),
	});

	const { handleSubmit, formRef, spin, errors, setErrors } = useMajiForm({
		validation: validationSchema,
	});

	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<form onSubmit={handleSubmit} ref={formRef}>
				<Text
					name='fname'
					label='First Name'
					errors={errors}
					setErrors={setErrors}
					validation={validationSchema}
				/>
				<Submit spin={spin}>Send</Submit>
			</form>
		</div>
	);
}

export default Index;
