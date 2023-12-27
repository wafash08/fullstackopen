import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import App from './App';
import './index.css';
import Bloglist from './components/bloglist';
import Users from './routes/users';
import User from './routes/user';
import Blog from './routes/blog';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
