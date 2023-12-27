import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLikeToBlog, removeBlogByID } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import { addComment, getBlogByID } from '../services/blogs';
import Comments from '../components/comments';

export default function Blog() {
	const [blog, setBlog] = useState(null);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		async function getBlog() {
			const response = await getBlogByID(id);
			setBlog(response);
		}
		getBlog();
	}, [id]);

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

	const handleAddComment = async (blogID, comment) => {
		const response = await addComment({ blogID, comment });
		setBlog({ ...blog, comments: [...blog.comments, response] });
	};

	if (!blog) {
		return <p>loading...</p>;
	}

	const showDeleteButton = blog.user.username === user.username;

	return (
		<div data-test='blog'>
			<div>
				<h2>
					{blog.title} by {blog.author}
				</h2>
			</div>
			<div>
				<p>
					<a href={`${blog.url}`} target='_blank' rel='noreferrer'>
						{blog.url}
					</a>
				</p>
				<p>
					<span>
						{blog.likes} {blog.likes > 1 ? 'likes' : 'like'}
					</span>
					<button
						type='button'
						onClick={() => handleLike(blog.id, blog)}
						data-test='like_button'
					>
						like
					</button>
				</p>
				<p>added by {blog.user.name}</p>
				{showDeleteButton ? (
					<button
						type='button'
						onClick={() => handleRemoveBlogByID(blog.id)}
						data-test='remove_button'
					>
						remove
					</button>
				) : null}
				<Comments blog={blog} onAddComment={handleAddComment} />
			</div>
		</div>
	);
}
