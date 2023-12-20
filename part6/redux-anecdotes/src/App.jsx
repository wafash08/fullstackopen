import { useSelector, useDispatch } from 'react-redux';

const App = () => {
	const anecdotes = useSelector(state => {
		return state.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = id => {
		dispatch({
			type: 'VOTE',
			payload: {
				id: id,
			},
		});
	};

	const createAnecdote = event => {
		event.preventDefault();
		const anecdote = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch({
			type: 'NEW_ANECDOTE',
			payload: {
				content: anecdote,
			},
		});
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
			<form onSubmit={createAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default App;
