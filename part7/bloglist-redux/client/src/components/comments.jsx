function Comment({ comment }) {
	return (
		<li>
			<p>{comment}</p>
		</li>
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
			<div>
				<h3>comments</h3>
				<form onSubmit={handleSubmit}>
					<input type='text' name='comment' />
					<button type='submit'>add comment</button>
				</form>
			</div>
			<ul>
				{blog.comments.map(({ comment, id }) => {
					return <Comment key={id} comment={comment} />;
				})}
			</ul>
		</>
	);
}
