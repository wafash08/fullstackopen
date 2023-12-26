import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import Bloglist from './components/bloglist';
import { addLikeTo, create, getAll, remove, setToken } from './services/blogs';
import { login } from './services/auth';
import { useNotify } from './notification-context';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';
export default function App() {
	const { data: blogs, error, isLoading, isError } = useQuery('blogs', getAll);
	const [user, setUser] = useState(null);
	const newBlogFormRef = useRef(null);
	const notify = useNotify();

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
				JSON.stringify(loggedInUser),
			);
			setToken(loggedInUser.token);
		} catch (error) {
			console.log(error);
			notify({ message: error.response.data.error, type: 'error' });
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem(LS_BLOGLIST_USER);
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
			notify({
				message: error.response.data.error,
				type: 'error',
			});
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
			notify({
				message:
					'blog you are trying to remove has already removed from the server',
				type: 'error',
			});
			setBlogs(blogs.filter((b) => b.id !== id));
		}
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
					<Bloglist
						blogs={blogs}
						onRemoveBlogBy={removeBlogBy}
						onUpdateLikesTo={updateLikesTo}
					/>
				</>
			)}
		</div>
	);
}
