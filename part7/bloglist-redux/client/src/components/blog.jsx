import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLikeToBlog, removeBlogByID } from '../reducers/blogReducer';

export default function Blog({ blog, user }) {
	const [showDetails, setShowDetails] = useState(false);
	const dispatch = useDispatch();
	const showDeleteButton = blog.user.username === user.username;

	const styles = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleLike = async (id, blogToLike) => {
		try {
			const updatedBlog = {
				...blogToLike,
				likes: blogToLike.likes + 1,
			};
			dispatch(addLikeToBlog(id, updatedBlog));
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

	const handleRemoveBlogByID = async (id) => {
		try {
			const hasConfirmation = window.confirm(
				`Remove blog ${blog.title} by ${blog.author}?`
			);
			if (!hasConfirmation) {
				return;
			}
			dispatch(removeBlogByID(id));
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

	return (
		<li style={styles} data-test='blog'>
			<div>
				<span>{blog.title}</span> <span>{blog.author}</span>
				<button
					type='button'
					onClick={() => setShowDetails(!showDetails)}
					data-test='view_hide_button'
				>
					{showDetails ? 'hide' : 'view'}
				</button>
			</div>
			{showDetails ? (
				<div>
					<p>
						<a href={`${blog.url}`} target='_blank' rel='noreferrer'>
							{blog.url}
						</a>
					</p>
					<p>
						<span>{blog.likes}</span>
						<button
							type='button'
							onClick={() => handleLike(blog.id, blog)}
							data-test='like_button'
						>
							like
						</button>
					</p>
					<p>{blog.user.name}</p>
					{showDeleteButton ? (
						<button
							type='button'
							onClick={() => handleRemoveBlogByID(blog.id)}
							data-test='remove_button'
						>
							remove
						</button>
					) : null}
				</div>
			) : null}
		</li>
	);
}
