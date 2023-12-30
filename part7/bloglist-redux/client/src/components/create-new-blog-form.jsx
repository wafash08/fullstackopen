export default function CreateNewBlogForm({ onCreateNewBlog }) {
	const handleCreateBlog = (e) => {
		e.preventDefault();
		const newBlogForm = e.target;
		const newBlogFormData = new FormData(newBlogForm);
		const blog = {};
		for (const [key, value] of newBlogFormData.entries()) {
			blog[key] = value;
		}
		onCreateNewBlog(blog);
		newBlogForm.reset();
	};

	return (
		<form onSubmit={handleCreateBlog}>
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
