import './styles/global.css';
import { Text, Submit, useMajiForm, Tel, FileUpload } from './maji-forms/index';
import { array, number, object, string } from 'yup';

function Index() {
	const { handleSubmit, formRef, spin, reg } = useMajiForm({
		validationSchema: object({
			fname: string(),
			phone: string().min(10, 'must be a valid phone number'),
		}),
	});

	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<form onSubmit={handleSubmit} ref={formRef}>
				<Text name='fname' label='First Name' reg={reg} />
				<Tel name='phone' label='Phone' reg={reg} />
				<FileUpload name='app' label='Application' reg={reg} />
				<Submit spin={spin}>Send</Submit>
			</form>
		</div>
	);
}

export default Index;
