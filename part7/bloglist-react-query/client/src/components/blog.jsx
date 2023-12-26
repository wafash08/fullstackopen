import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addLikeTo, remove } from '../services/blogs';
import { useNotify } from '../notification-context';

export default function Blog({ blog, user }) {
	const queryClient = useQueryClient();
	const notify = useNotify();
	const onLikeMutation = useMutation(addLikeTo, {
		onSuccess: (data) => {
			const blogs = queryClient.getQueryData('blogs');
			const blogsAfterLike = blogs.map((blog) => {
				return blog.id === data.id
					? {
							...data,
							user: {
								username: blog.user.username,
								name: blog.user.name,
								id: blog.user.id,
							},
						}
					: blog;
			});
			queryClient.setQueryData('blogs', blogsAfterLike);
			notify({ message: `You liked ${data.title}!`, type: 'success' });
		},
	});
	const onRemoveMutation = useMutation(remove, {
		onSuccess: () => {
			const blogs = queryClient.getQueryData('blogs');
			const blogsAfterRemove = blogs.filter((b) => b.id !== blog.id);
			queryClient.setQueryData('blogs', blogsAfterRemove);
		},
	});
	const [showDetails, setShowDetails] = useState(false);

	const showDeleteButton = blog.user.username === user.username;

	const styles = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

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
					<p>{blog.url}</p>
					<p>
						<span>{blog.likes}</span>
						<button
							type='button'
							onClick={() => handleLike(blog)}
							data-test='like_button'
						>
							like
						</button>
					</p>
					<p>{blog.user.name}</p>
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
			) : null}
		</li>
	);
}
