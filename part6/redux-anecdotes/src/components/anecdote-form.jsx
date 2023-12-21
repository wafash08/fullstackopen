import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

export default function AnecdoteForm() {
	const dispatch = useDispatch();
	const create = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote({ content: anecdote }));
	};
	return (
		<>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	);
}
