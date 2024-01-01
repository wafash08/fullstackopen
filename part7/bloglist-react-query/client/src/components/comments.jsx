import { Button, Form, ListGroup } from 'react-bootstrap';

function Comment({ comment }) {
	return (
		<ListGroup.Item as='li'>
			<p className='m-0'>{comment}</p>
		</ListGroup.Item>
	);
}

export default function Comments({ onAddComment, blog }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const commentFormData = new FormData(e.target);
		const comment = {};
		for (const [key, value] of commentFormData.entries()) {
			comment[key] = value;
		}
		console.log(comment);
		onAddComment(blog.id, comment);
		const commentForm = e.target;
		commentForm.reset();
	};
	return (
		<>
			<div className='mt-4'>
				<h3>Comments</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Control
							required
							type='text'
							name='comment'
							className='mb-2'
						/>
						<Button variant='secondary' type='submit'>
							Send
						</Button>
					</Form.Group>
				</Form>
			</div>
			<ListGroup as='ul' className='mt-4 grid gap-2'>
				{blog.comments.map(({ comment, id }) => {
					return <Comment key={id} comment={comment} />;
				})}
			</ListGroup>
		</>
	);
}
