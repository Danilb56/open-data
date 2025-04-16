import { redirect } from 'react-router';
import { validateAccessToken } from './validateAccessToken';
export async function protectRoute(callback) {
  const res = await validateAccessToken();

  if (res.status == 401) return redirect('/login');
  const data = await res.json();
  if (!data.cardId) return redirect('/onboarding');

  if (!callback) return;

  return await callback();
}
