import LoginPage from '#pages/login';
import MainPage from '#pages/main';
import SignupPage from '#pages/signup';
import { protectRoute } from '#utils/protectRoute';
import { validateAccessToken } from '#utils/validateAccessToken.js';
import { createBrowserRouter, redirect } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return protectRoute();
    },
    element: <MainPage />,
  },
  {
    path: '/signup',
    loader: async () => {
      const res = await validateAccessToken();
      if (res.status != 401) return redirect('/');
    },
    element: <SignupPage />,
  },
  {
    path: '/login',
    loader: async () => {
      const res = await validateAccessToken();
      if (res.status != 401) return redirect('/');
    },
    element: <LoginPage />,
  },
]);

export default router;
