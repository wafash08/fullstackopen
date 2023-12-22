import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const newAnecdoteMutation = useMutation({
		mutationFn: createNewAnecdote,
		onSuccess: newAnecdote => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
		},
	});
	const onCreate = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		newAnecdoteMutation.mutate(anecdote);
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
