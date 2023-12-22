import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdote-reducer';
import { setNotification } from '../reducers/notification-reducer';

export default function AnecdoteForm() {
	const dispatch = useDispatch();
	const create = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(anecdote));
		dispatch(
			setNotification(`anecdote ${anecdote} has successfully created`, 5)
		);
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
