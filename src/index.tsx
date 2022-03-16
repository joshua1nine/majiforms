import './styles/global.css';
import { Text, Submit, useMajiForm, Tel } from './maji-forms/index';
import { object, string } from 'yup';

function Index() {
	const { handleSubmit, formRef, spin, reg } = useMajiForm({
		validationSchema: object({
			fname: string().required(),
			// phone: string().min(10, 'must be a valid phone number').required(),
		}),
	});

	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<form onSubmit={handleSubmit} ref={formRef}>
				<Text name='fname' label='First Name' reg={reg} />
				<Tel name='phone' label='Phone' reg={reg} />
				<Submit spin={spin}>Send</Submit>
			</form>
		</div>
	);
}

export default Index;
