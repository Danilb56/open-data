import { callApi } from '#utils/callApi';
export const updateLocations = async (data) => {
  const response = await callApi('/user/locations', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
