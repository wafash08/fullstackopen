import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import Bloglist from './components/bloglist';
import { addLikeTo, create, remove, setToken } from './services/blogs';
import { login } from './services/auth';
import { setNotification } from './reducers/notificationReducer';
import { createBlog, initializeBlog } from './reducers/blogReducer';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';
export default function App() {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
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

	const updateLikesTo = async (id, updatedBlog) => {
		try {
			const result = await addLikeTo(id, updatedBlog);
			const blogsAfterUpdateLikes = blogs.map((b) => {
				return b.id === result.id ? { ...b, result } : b;
			});
			setBlogs(blogsAfterUpdateLikes);
		} catch (error) {
			console.error(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};

	const removeBlogBy = async (id) => {
		try {
			const blogToRemove = blogs.find((b) => b.id === id);
			if (!blogToRemove) {
				return;
			}
			await remove(id);
			setBlogs(blogs.filter((b) => b.id !== id));
		} catch (error) {
			dispatch(
				setNotification({
					message:
						'blog you are trying to remove has already removed from the server',
					type: 'error',
				})
			);
			setBlogs(blogs.filter((b) => b.id !== id));
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
					<Bloglist
						onRemoveBlogBy={removeBlogBy}
						onUpdateLikesTo={updateLikesTo}
					/>
				</>
			)}
		</div>
	);
}
