import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer';

const App = () => {
	const anecdotes = useSelector(state => {
		return state.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = id => {
		dispatch(voteAnecdote(id));
	};

	const create = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(anecdote));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default App;
