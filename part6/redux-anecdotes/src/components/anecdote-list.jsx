import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

export default function AnecdoteList() {
	const anecdoteList = useSelector(({ anecdotes, filter }) => {
		if (!filter) {
			return anecdotes.sort((a, b) => b.votes - a.votes);
		}
		return anecdotes
			.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
			.sort((a, b) => b.votes - a.votes);
	});

	const dispatch = useDispatch();

	const voteAnecdote = id => {
		dispatch(vote(id));
	};

	return anecdoteList.map(anecdote => (
		<div key={anecdote.id}>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
			</div>
		</div>
	));
}
