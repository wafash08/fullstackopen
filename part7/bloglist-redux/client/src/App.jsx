import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import { createBlog, initializeBlog } from './reducers/blogReducer';
import { Link, Outlet } from 'react-router-dom';
import { initializeUser, logoutUser } from './reducers/authReducer';

function Navigation({ user }) {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return (
		<nav className='navigation'>
			<ul
				style={{ listStyle: 'none', display: 'flex', gap: '0.5rem' }}
				className='navigation-list'
			>
				<li>
					<Link to={'/'}>blogs</Link>
				</li>
				<li>
					<Link to={'/users'}>users</Link>
				</li>
				<li style={{ marginLeft: 'auto' }}>
					<span>Hi {user.name}!</span>
					<button
						type='button'
						onClick={handleLogout}
						data-test='logout_button'
					>
						logout
					</button>
				</li>
			</ul>
		</nav>
	);
}

export default function App() {
	const user = useSelector((state) => state.auth);
	const newBlogFormRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlog());
	}, []);

	useEffect(() => {
		dispatch(initializeUser());
	}, []);

	const createNewBlog = async (blog) => {
		newBlogFormRef.current.toggleVisibility();
		const newBlogWithUser = {
			...blog,
			user: {
				username: user.username,
				name: user.name,
			},
		};
		dispatch(createBlog(newBlogWithUser));
	};

	return (
		<div>
			<Notification />
			{user === null ? (
				<>
					<h2>Log in to application</h2>
					<LoginForm />
				</>
			) : (
				<>
					<Navigation user={user} />
					<Togglable buttonLable={'create new blog'} ref={newBlogFormRef}>
						<CreateNewBlogForm onCreateNewBlog={createNewBlog} />
					</Togglable>
					<Outlet />
				</>
			)}
		</div>
	);
}
