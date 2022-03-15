// Convert Error Array to Object
export const convertArrayToObject = (arr: any[]) => {
	if (Array.isArray(arr)) {
		return arr.reduce(
			(obj, key) => ({
				...obj,
				[key.path]: key.message,
			}),
			{}
		);
	}
};
