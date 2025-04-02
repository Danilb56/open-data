import { redirect } from 'react-router';
import { validateAccessToken } from './validateAccessToken';
export async function protectRoute(callback) {
  const res = await validateAccessToken();

  if (res.status == 401) return redirect('/login');

  if (!callback) return;

  return await callback();
}
