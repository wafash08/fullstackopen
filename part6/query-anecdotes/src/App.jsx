import { useQuery } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes } from './services/anecdotes';

const App = () => {
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	console.log(JSON.parse(JSON.stringify(result)));

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>{result.error.message}</div>;
	}

	const handleVote = anecdote => {
		console.log('vote');
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
