import { callApi } from '#utils/callApi';

export const createCard = async (data) => {
  const res = await callApi('/user/create-card', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
};
