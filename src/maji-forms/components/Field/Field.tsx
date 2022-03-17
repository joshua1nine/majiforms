import { Text } from '../Text';
import { Tel } from '../Tel';

type Props = {
	type?: 'tel' | 'text';
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export const Field = ({ type, name, label, required, description }: Props) => {
	switch (type) {
		case 'tel':
			return (
				<Tel
					name={name}
					label={label}
					required={required}
					description={description}
				/>
			);

		default:
			return (
				<Text
					name={name}
					label={label}
					required={required}
					description={description}
				/>
			);
	}
};
