import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addLikeTo, getBlogByID, remove } from '../services/blogs';
import { useNotify } from '../contexts/notification-context';
import { useUser } from '../contexts/user-context';

export default function Blog() {
	const user = useUser();
	const navigate = useNavigate();
	const params = useParams();
	const blogID = params.id;
	const { data: blog, isLoading } = useQuery({
		queryKey: ['user', blogID],
		queryFn: () => getBlogByID(blogID),
	});
	const queryClient = useQueryClient();
	const notify = useNotify();
	const onLikeMutation = useMutation(addLikeTo, {
		onSuccess: (data) => {
			queryClient.invalidateQueries('user');
			notify({ message: `You liked ${data.title}!`, type: 'success' });
		},
	});
	const onRemoveMutation = useMutation(remove, {
		onSuccess: () => {
			const blogs = queryClient.getQueryData('blogs');
			const blogsAfterRemove = blogs.filter((b) => b.id !== blog.id);
			queryClient.setQueryData('blogs', blogsAfterRemove);
			navigate('/');
		},
	});

	const handleLike = async (blog) => {
		const blogToLike = {
			...blog,
			likes: blog.likes + 1,
		};
		onLikeMutation.mutate(blogToLike);
	};

	const handleRemoveBlogBy = async (id) => {
		const hasConfirmation = window.confirm(
			`Remove blog ${blog.title} by ${blog.author}?`,
		);
		if (!hasConfirmation) {
			return;
		}
		onRemoveMutation.mutate(id);
	};

	if (isLoading) {
		return <p>Loading...</p>;
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
				<a href={blog.url} rel='noreferrer' target='_blank'>
					{blog.url}
				</a>
				<p>
					<span>
						{blog.likes} {blog.likes > 1 ? 'likes' : 'like'}
					</span>{' '}
					<button
						type='button'
						onClick={() => handleLike(blog)}
						data-test='like_button'
					>
						like
					</button>
				</p>
				<p>added by {blog.user.name}</p>
				{showDeleteButton ? (
					<button
						type='button'
						onClick={() => handleRemoveBlogBy(blog.id)}
						data-test='remove_button'
					>
						remove
					</button>
				) : null}
			</div>
		</div>
	);
}
