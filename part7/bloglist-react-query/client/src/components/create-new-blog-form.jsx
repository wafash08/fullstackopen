import { useMutation, useQueryClient } from 'react-query';
import { create as createBlog } from '../services/blogs';
import { useNotify } from '../contexts/notification-context';
import { useUser } from '../contexts/user-context';

export default function CreateNewBlogForm() {
	const user = useUser();
	const queryClient = useQueryClient();
	const notify = useNotify();
	const createBlogMutation = useMutation(createBlog, {
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData('blogs');
			const newBlogWithUser = {
				...newBlog,
				user: {
					username: user.username,
					name: user.name,
				},
			};
			queryClient.setQueryData('blogs', blogs.concat(newBlogWithUser));
			notify({
				message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
				type: 'success',
			});
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleCreateBlog = (e) => {
		e.preventDefault();
		const blogFormData = new FormData(e.target);
		const blog = {};
		for (const [key, value] of blogFormData.entries()) {
			blog[key] = value;
		}
		createBlogMutation.mutate(blog);
		const newBlogForm = document.querySelector('[name="newBlogForm"]');
		newBlogForm.reset();
	};

	return (
		<form onSubmit={handleCreateBlog} name='newBlogForm'>
			<div>
				<label htmlFor='title'>title</label>
				<input type='text' id='title' name='title' data-test='title' />
			</div>
			<div>
				<label htmlFor='author'>author</label>
				<input type='text' id='author' name='author' data-test='author' />
			</div>
			<div>
				<label htmlFor='url'>url</label>
				<input type='url' id='url' name='url' data-test='url' />
			</div>
			<button type='submit' data-test='create'>
				create
			</button>
		</form>
	);
}
