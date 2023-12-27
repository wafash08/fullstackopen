import { useRef } from 'react';
import { useQuery } from 'react-query';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import Bloglist from './components/bloglist';
import { getAll, setToken } from './services/blogs';
import { login } from './services/auth';
import { useNotify } from './contexts/notification-context';
import { useSetUser, useUser } from './contexts/user-context';
import { Outlet } from 'react-router-dom';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';
export default function App() {
	const {
		data: blogs,
		error,
		isLoading,
		isError,
	} = useQuery({
		queryKey: 'blogs',
		queryFn: getAll,
		retry: 1,
	});
	const user = useUser();
	const dispatchUser = useSetUser();
	const newBlogFormRef = useRef(null);
	const notify = useNotify();

	const handleLogin = async ({ username, password }) => {
		try {
			const loggedInUser = await login({ username, password });
			dispatchUser({ type: 'SET', payload: loggedInUser });
		} catch (error) {
			console.log(error);
			notify({ message: error.response.data.error, type: 'error' });
		}
	};

	const handleLogout = () => {
		dispatchUser({ type: 'CLEAR' });
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			{user === null ? <h2>Log in to application</h2> : <h2>blogs</h2>}
			<Notification />
			{user === null ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<>
					<p>
						<span>{user.name} logged in</span>
						<button
							type='button'
							onClick={handleLogout}
							data-test='logout_button'
						>
							logout
						</button>
					</p>
					<Togglable buttonLable={'create new blog'} ref={newBlogFormRef}>
						<CreateNewBlogForm />
					</Togglable>
					<Bloglist blogs={blogs} />
					<Outlet />
				</>
			)}
		</div>
	);
}
