export async function callApi(url, options) {
	return await fetch(
		import.meta.env.API_URL || 'http://localhost:3000' + url,
		options
	);
}
