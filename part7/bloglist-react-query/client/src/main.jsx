import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import NotificationContextProvider from './contexts/notification-context';
import UserContextProvider from './contexts/user-context';
import Users from './routes/users';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/users',
				element: <Users />,
			},
		],
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
