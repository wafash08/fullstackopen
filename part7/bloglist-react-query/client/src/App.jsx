import { useRef } from 'react';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import { login } from './services/auth';
import { useNotify } from './contexts/notification-context';
import { useSetUser, useUser } from './contexts/user-context';
import { Link, Outlet } from 'react-router-dom';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';

function Navigation({ user, onLogout }) {
	return (
		<nav>
			<ul style={{ listStyle: 'none', display: 'flex', gap: '0.5rem' }}>
				<li>
					<Link to={'/'}>blogs</Link>
				</li>
				<li>
					<Link to={'/users'}>users</Link>
				</li>
				<li style={{ marginLeft: 'auto' }}>
					<span>{user.name} logged in</span>
					<button type='button' onClick={onLogout} data-test='logout_button'>
						logout
					</button>
				</li>
			</ul>
		</nav>
	);
}

export default function App() {
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

	return (
		<div>
			<Notification />
			{user === null ? (
				<>
					<h2>Log in to application</h2>
					<LoginForm onLogin={handleLogin} />
				</>
			) : (
				<>
					<Navigation user={user} onLogout={handleLogout} />
					<Togglable buttonLable={'create new blog'} ref={newBlogFormRef}>
						<CreateNewBlogForm />
					</Togglable>
					<Outlet />
				</>
			)}
		</div>
	);
}
