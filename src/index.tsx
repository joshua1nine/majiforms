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
	HoneyPot,
	Checkbox,
	CheckboxGroup,
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
				<TextArea name='textArea' label='Text Area' />
				<Email name='email' label='Email' />
				<Number name='number' label='Number' />
				<Url name='Url' label='Url' />
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
					options={[
						{ id: 'male', label: 'Male', value: 'male' },
						{ id: 'female', label: 'Female', value: 'female' },
						{ id: 'other', label: 'Other', value: 'other' },
					]}
				/>
				<CheckboxGroup
					name='favColors'
					label='Favorite Colors'
					description='Please select at least two'
					layout='horizontal'
					max={2}
					options={[
						{ id: 'purple', label: 'Purple', value: 'purple' },
						{ id: 'green', label: 'Green', value: 'green' },
						{ id: 'blue', label: 'Blue', value: 'blue' },
					]}
				/>
				<Checkbox
					name='terms'
					label='Terms'
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam illo corporis odio et obcaecati enim debitis quisquam iure facere vero. Omnis necessitatibus est aperiam perferendis labore quod earum nihil sint? Magnam ipsa, modi doloribus esse possimus itaque quam quibusdam quis, vero et rem atque consectetur iusto assumenda. Perspiciatis aliquid, veniam, perferendis possimus voluptates unde dolorum corrupti consequatur iusto odit ipsa?'
				/>
				<HoneyPot />
				<Submit>Send</Submit>
			</Form>
		</div>
	);
}

export default Index;
