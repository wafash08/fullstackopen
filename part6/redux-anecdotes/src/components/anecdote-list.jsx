import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdote-reducer';

export default function AnecdoteList() {
	const anecdoteList = useSelector(({ anecdotes, filter }) => {
		// you have to copy the anecdotes lol
		const anecdotesToSort = [...anecdotes];
		if (!filter) {
			return anecdotesToSort.sort(function compare(a, b) {
				return b.votes - a.votes;
			});
		}
		return anecdotesToSort
			.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
			.sort((a, b) => b.votes - a.votes);
	});

	const dispatch = useDispatch();

	const vote = id => {
		dispatch(voteAnecdote({ id }));
		const anecdoteToVote = anecdoteList.find(a => a.id === id);
		dispatch({
			type: 'notification/show',
			payload: {
				message: `you think that "${anecdoteToVote.content}" is funny? Yeah, i guess i think so😂`,
			},
		});
		setTimeout(() => {
			dispatch({
				type: 'notification/hide',
				payload: { message: null },
			});
		}, 5000);
	};

	return anecdoteList.map(anecdote => {
		return (
			<div key={anecdote.id}>
				<div>{anecdote.content}</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			</div>
		);
	});
}
