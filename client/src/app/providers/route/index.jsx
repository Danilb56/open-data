import LoginPage from '#pages/login';
import MainPage from '#pages/main';
import OnboardingPage from '#pages/onboarding';
import SignupPage from '#pages/signup';
import { callApi } from '#utils/callApi';
import { protectRoute } from '#utils/protectRoute';
import { validateAccessToken } from '#utils/validateAccessToken.js';
import { createBrowserRouter, redirect } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return protectRoute(async () => {
        return await callApi('/user/cards');
      });
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
  {
    path: '/onboarding',

    loader: async () => {
      return protectRoute(async () => {
        return await callApi('/geo/markers');
      });
    },

    element: <OnboardingPage />,
  },
]);

export default router;
