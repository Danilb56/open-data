import { callApi } from '#utils/callApi';

export const signup = async ({ email, password }) => {
	const res = await callApi('/auth/signup', {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({ user: { email, password } }),
	});

	return res;
};
