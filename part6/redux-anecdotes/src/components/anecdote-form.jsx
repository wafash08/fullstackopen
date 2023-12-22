import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdote-reducer';
import {
	hideNotification,
	showNotification,
} from '../reducers/notification-reducer';
import { createNew } from '../services/anecdotes';

export default function AnecdoteForm() {
	const dispatch = useDispatch();
	const create = async event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		const newAnecdote = await createNew(anecdote);
		dispatch(createAnecdote(newAnecdote));
		dispatch(
			showNotification({
				message: `anecdote ${newAnecdote.content} has successfully created`,
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
