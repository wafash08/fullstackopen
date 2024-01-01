import { useRef } from 'react';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import { login } from './services/auth';
import { useNotify } from './contexts/notification-context';
import { useSetUser, useUser } from './contexts/user-context';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';

function Navigation({ user, onLogout }) {
	return (
		<Navbar bg='light' expand='lg' data-bs-theme='light'>
			<Navbar.Toggle aria-controls='navigation' />
			<Navbar.Collapse>
				<Nav as='ul' style={{ width: '100%' }} className='d-flex'>
					<Nav.Link as='li' className='d-flex align-items-center'>
						<Link to={'/'}>Blogs</Link>
					</Nav.Link>
					<Nav.Link as='li' className='d-flex align-items-center'>
						<Link to={'/users'}>Users</Link>
					</Nav.Link>
					<Nav.Link as='li' className='d-flex align-items-center gap-2'>
						<span>{user.name} logged in</span>
						<Button
							type='button'
							variant='danger'
							onClick={onLogout}
							data-test='logout_button'
						>
							logout
						</Button>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default function App() {
	const user = useUser();
	const dispatchUser = useSetUser();
	const newBlogFormRef = useRef(null);
	const notify = useNotify();
	const navigate = useNavigate();

	const handleLogin = async ({ username, password }) => {
		try {
			const loggedInUser = await login({ username, password });
			dispatchUser({ type: 'SET', payload: loggedInUser });
			navigate('/');
		} catch (error) {
			console.log(error);
			notify({ message: error.response.data.error, type: 'error' });
		}
	};

	const handleLogout = () => {
		dispatchUser({ type: 'CLEAR' });
		navigate('/');
	};

	return (
		<div className='mb-5'>
			<Notification />
			{user === null ? (
				<Container>
					<h2>Log in to application</h2>
					<LoginForm onLogin={handleLogin} />
				</Container>
			) : (
				<Container>
					<Navigation user={user} onLogout={handleLogout} />
					<Togglable buttonLable={'Create new blog'} ref={newBlogFormRef}>
						<CreateNewBlogForm />
					</Togglable>
					<Outlet />
				</Container>
			)}
		</div>
	);
}
