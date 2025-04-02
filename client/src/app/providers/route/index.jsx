import LoginPage from '#pages/login';
import MainPage from '#pages/main';
import SignupPage from '#pages/signup';
import { protectRoute } from '#utils/protectRoute';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    loader: protectRoute,
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
