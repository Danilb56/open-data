import { createBrowserRouter } from 'react-router';
import SignupPage from '#pages/signup';
import LoginPage from '#pages/login';
import MainPage from '#pages/main';
import { callApi } from '#utils/callApi';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      return await callApi('/auth/validate-access-token', {
        cache: 'no-store',
      });
    },
    element: <MainPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
