import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import { setToken } from './services/blogs';
import { LS_BLOGLIST_USER, logout } from './services/auth';
import { setNotification } from './reducers/notificationReducer';
import { createBlog, initializeBlog } from './reducers/blogReducer';
import { clearUser, loginOf, setUser } from './reducers/userReducer';
import { Outlet } from 'react-router-dom';

export default function App() {
	const user = useSelector((state) => state.user);
	const newBlogFormRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlog());
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const userFromLS = JSON.parse(loggedInUser);
			dispatch(setUser(userFromLS));
			setToken(userFromLS.token);
		}
	}, []);

	const handleLogin = async ({ username, password }) => {
		try {
			dispatch(loginOf({ username, password }));
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
		dispatch(clearUser());
		logout();
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
					<Outlet />
				</>
			)}
		</div>
	);
}
