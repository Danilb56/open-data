import { createBrowserRouter } from 'react-router-dom';
import SignupPage from '#pages/signup';
import LoginPage from '#pages/login';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello World</div>,
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
