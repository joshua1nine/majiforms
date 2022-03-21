import './styles/global.css';
import { Submit, Form, Text, Tel, File } from './maji-forms/index';

function Index() {
	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<Form>
				<Text name='fname' label='First Name' required />
				<Text name='lname' label='Last Name' required />
				<Tel name='phone' label='Phone' required />
				<File
					name='app'
					label='Application'
					required
					accept='.pdf,.jpg,.jpeg'
				/>
				<Submit>Send</Submit>
			</Form>
		</div>
	);
}

export default Index;
