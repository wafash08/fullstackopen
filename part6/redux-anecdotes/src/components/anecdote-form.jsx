import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdote-reducer';
import {
	hideNotification,
	showNotification,
} from '../reducers/notification-reducer';

export default function AnecdoteForm() {
	const dispatch = useDispatch();
	const create = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote({ content: anecdote }));
		dispatch(
			showNotification({
				message: `anecdote ${anecdote} has successfully created`,
			})
		);
		setTimeout(() => {
			dispatch(hideNotification({ message: null }));
		}, 5000);
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
