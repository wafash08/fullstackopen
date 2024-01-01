import { useDispatch, useSelector } from 'react-redux';
import { addLikeToBlog, removeBlogByID } from '../reducers/blogReducer';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/comments';

export default function Blog() {
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const handleLike = (id, blogToLike) => {
		const updatedBlog = {
			...blogToLike,
			likes: blogToLike.likes + 1,
		};
		dispatch(addLikeToBlog(id, updatedBlog));
	};

	const handleRemoveBlogByID = async (id) => {
		const hasConfirmation = window.confirm(
			`Remove blog ${blog.title} by ${blog.author}?`
		);
		if (!hasConfirmation) {
			return;
		}
		navigate('/');
		dispatch(removeBlogByID(id));
	};

	const blog = blogs.find((b) => b.id === id);

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
				<Comments blog={blog} />
			</div>
		</div>
	);
}
