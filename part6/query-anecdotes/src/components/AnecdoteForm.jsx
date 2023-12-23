import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewAnecdote } from '../services/anecdotes';
import { useNotify } from '../contexts/notification-context';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotify();

	const notifyWith = (message, timeout = 5) => {
		dispatch({ type: 'SET', payload: { message } });
		setTimeout(() => {
			dispatch({ type: 'CLEAR' });
		}, timeout * 1000);
	};

	const newAnecdoteMutation = useMutation({
		mutationFn: createNewAnecdote,
		onSuccess: newAnecdote => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
		},
		onError: error => {
			notifyWith(error.message);
		},
	});

	const onCreate = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		newAnecdoteMutation.mutate(anecdote);
		notifyWith(`anecdote "${anecdote}" created`);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
