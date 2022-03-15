export const toJSON = (formData: any | FormData) => {
	let formFields = {};
	for (var pair of formData.entries()) {
		formFields[pair[0]] = pair[1];
	}
	return formFields;
};
