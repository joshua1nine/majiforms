import './styles/global.css';
import { Text, Submit, useMajiForm, Tel, FileUpload } from './maji-forms/index';
import { array, number, object, string } from 'yup';
import { Form } from './maji-forms/components/Form';

function Index() {
	// const { handleSubmit, formRef, spin, reg } = useMajiForm({
	// 	validation: true,
	// });

	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<Form>
				<Text name='fname' label='First Name' required />
				<Text name='lname' label='Last Name' required />
				<Submit>Send</Submit>
			</Form>
		</div>
	);
}

export default Index;
