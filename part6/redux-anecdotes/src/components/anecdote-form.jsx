import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';

export default function AnecdoteForm() {
	const dispatch = useDispatch();
	const createAnecdote = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(create(anecdote));
	};
	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	);
}
