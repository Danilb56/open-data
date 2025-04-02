import { redirect } from 'react-router';
export async function protectRoute(callback) {
  const res = await fetch(
    import.meta.env.API_URL ||
      'http://localhost:3000' + '/auth/validate-access-token',
    { cache: 'no-store', credentials: 'include' },
  );

  if (res.status == 401) return redirect('/login');

  return await callback();
}
