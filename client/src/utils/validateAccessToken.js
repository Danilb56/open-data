export async function validateAccessToken() {
  const res = await fetch(
    import.meta.env.API_URL ||
      'http://localhost:3000' + '/auth/validate-access-token',
    { cache: 'no-store', credentials: 'include' },
  );
  return res;
}
