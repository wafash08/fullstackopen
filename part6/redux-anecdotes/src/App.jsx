import { useSelector, useDispatch } from 'react-redux';
import { vote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/anecdote-form';

const App = () => {
	const anecdotes = useSelector(state => {
		return state.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const voteAnecdote = id => {
		dispatch(vote(id));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	);
};

export default App;
