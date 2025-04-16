import { callApi } from '#utils/callApi';
export const updateUserCredentials = async (data) => {
  const response = await callApi('/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
