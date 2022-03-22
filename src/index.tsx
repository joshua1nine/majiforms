import './styles/global.css';
import {
	Submit,
	Form,
	Text,
	Tel,
	File,
	TextArea,
	Email,
	Number,
	Url,
	Select,
	Radio,
} from './maji-forms/index';

function Index() {
	return (
		<div className='container mx-auto max-w-4xl p-3 mt-6'>
			<h1 className='text-5xl mb-8'>Maji Forms</h1>
			<Form submitType='application/json' action='api/hello'>
				<Text name='fname' label='First Name' />
				<Text name='lname' label='Last Name' />
				<Tel name='phone' label='Phone' />
				<File name='app' label='Application' accept='.pdf,.jpg,.jpeg,.png' />
				<TextArea name='textArea' label='Text Area' required />
				<Email name='email' label='Email' />
				<Number name='number' label='Number' required />
				<Url name='Url' label='Url' required />
				<Select
					name='select'
					label='Select'
					options={[
						{ label: 'Option 1', value: 'opt1' },
						{ label: 'Option 2', value: 'opt2' },
					]}
				/>
				<Radio
					name='gender'
					label='Gender'
					description='Please select one'
					layout='horizontal'
					required
					options={[
						{ id: 'male', label: 'Male', value: 'male' },
						{ id: 'female', label: 'Female', value: 'female' },
						{ id: 'other', label: 'Other', value: 'other' },
					]}
				/>
				<Submit>Send</Submit>
			</Form>
		</div>
	);
}

export default Index;
