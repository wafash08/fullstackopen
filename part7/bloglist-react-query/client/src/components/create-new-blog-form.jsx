import { useMutation, useQueryClient } from 'react-query';
import { create as createBlog } from '../services/blogs';
import { useNotify } from '../contexts/notification-context';
import { useUser } from '../contexts/user-context';
import { Button, Form } from 'react-bootstrap';

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
		<Form onSubmit={handleCreateBlog} name='newBlogForm'>
			<Form.Group className='mb-2' controlId='title'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type='text'
					placeholder='An Interactive Guide to CSS Grid'
					name='title'
					data-test='title'
					required
				/>
			</Form.Group>
			<Form.Group className='mb-2' controlId='author'>
				<Form.Label>Author</Form.Label>
				<Form.Control
					type='text'
					placeholder='Josh Comeau'
					name='author'
					data-test='author'
					required
				/>
			</Form.Group>
			<Form.Group className='mb-2' controlId='url'>
				<Form.Label>Url</Form.Label>
				<Form.Control
					type='text'
					placeholder='https://www.joshwcomeau.com/css/interactive-guide-to-grid/'
					name='url'
					data-test='url'
					required
				/>
			</Form.Group>
			<Button
				className='mb-2'
				variant='success'
				type='submit'
				data-test='create'
			>
				create
			</Button>
		</Form>
	);
}
