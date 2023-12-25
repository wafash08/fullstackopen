import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import Bloglist from './components/bloglist';
import { remove, setToken } from './services/blogs';
import { login } from './services/auth';
import { setNotification } from './reducers/notificationReducer';
import {
	addLikeToBlog,
	createBlog,
	initializeBlog,
} from './reducers/blogReducer';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';
export default function App() {
	const [user, setUser] = useState(null);
	const newBlogFormRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlog());
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
			setToken(user.token);
		}
	}, []);

	const handleLogin = async ({ username, password }) => {
		try {
			const loggedInUser = await login({ username, password });
			setUser(loggedInUser);
			window.localStorage.setItem(
				LS_BLOGLIST_USER,
				JSON.stringify(loggedInUser)
			);
			setToken(loggedInUser.token);
		} catch (error) {
			console.log(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem(LS_BLOGLIST_USER);
	};

	const createNewBlog = async (blog) => {
		try {
			newBlogFormRef.current.toggleVisibility();
			const newBlogWithUser = {
				...blog,
				user: {
					username: user.username,
					name: user.name,
				},
			};
			dispatch(createBlog(newBlogWithUser));
			dispatch(
				setNotification({
					message: `a new blog ${blog.title} by ${blog.author} added`,
					type: 'success',
				})
			);
		} catch (error) {
			console.log(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};

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
						<CreateNewBlogForm onCreateNewBlog={createNewBlog} />
					</Togglable>
					<Bloglist />
				</>
			)}
		</div>
	);
}
