export async function callApi(url, options) {
	const res = await fetch(
		import.meta.env.API_URL || 'http://localhost:3000' + url,
		{ ...options, credentials: 'include' }
	);
	if (res.status == 401) window.location.href = '/login';
	return res;
}
