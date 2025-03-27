import { createBrowserRouter } from 'react-router-dom';
import SignupPage from '#pages/signup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello World</div>,
	},
	{
		path: '/signup',
		element: <SignupPage />,
	},
]);

export default router;
