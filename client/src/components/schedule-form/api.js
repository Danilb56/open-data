import { callApi } from '#utils/callApi';
export const updateSchedules = async (data) => {
  const response = await callApi('/user/schedules', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
