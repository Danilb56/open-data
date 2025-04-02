import { callApi } from '#utils/callApi';

export const login = async ({ email, password }) => {
  const res = await callApi('/auth/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ user: { email, password } }),
  });

  return res;
};
