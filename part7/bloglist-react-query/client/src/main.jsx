import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import NotificationContextProvider from './contexts/notification-context';
import UserContextProvider from './contexts/user-context';
import Users from './routes/users';
import User from './routes/user';
import Bloglist from './components/bloglist';
import Blog from './routes/blog';
import SignUp from './routes/signup';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <p>Ooops, the page you are accessing does not exist!</p>,
		children: [
			{
				index: true,
				element: <Bloglist />,
			},
			{
				path: '/users',
				element: <Users />,
			},
			{
				path: '/users/:id',
				element: <User />,
			},
			{
				path: '/blogs/:id',
				element: <Blog />,
			},
		],
	},
	{
		path: '/signup',
		element: <SignUp />,
		errorElement: <p>Ooops, the page you are accessing does not exist!</p>,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<RouterProvider router={router} />
			</NotificationContextProvider>
		</UserContextProvider>
	</QueryClientProvider>,
);
