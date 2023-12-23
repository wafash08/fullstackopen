import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { addVote, getAnecdotes } from './services/anecdotes';
import { useNotify } from './contexts/notification-context';

const App = () => {
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: 1,
		refetchOnWindowFocus: false,
	});
	const queryClient = useQueryClient();
	const addVoteMutation = useMutation({
		mutationFn: addVote,
		onSuccess: anecdote => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.map(a => (a.id === anecdote.id ? anecdote : a))
			);
		},
	});

	const dispatch = useNotify();

	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>{result.error.message}</div>;
	}

	const notifyWith = (message, timeout = 5) => {
		dispatch({ type: 'SET', payload: { message } });
		setTimeout(() => {
			dispatch({ type: 'CLEAR' });
		}, timeout * 1000);
	};

	const handleVote = anecdote => {
		addVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
		notifyWith(`anecdote "${anecdote.content}" voted`);
	};

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
