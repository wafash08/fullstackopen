import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdote-reducer';
import {
	hideNotification,
	showNotification,
} from '../reducers/notification-reducer';

export default function AnecdoteList() {
	const anecdoteList = useSelector(({ anecdotes, filter }) => {
		// you have to copy the anecdotes lol
		const anecdotesToSort = [...anecdotes];
		if (!filter) {
			return anecdotesToSort.sort((a, b) => b.votes - a.votes);
		}
		return anecdotesToSort
			.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
			.sort((a, b) => b.votes - a.votes);
	});

	const dispatch = useDispatch();

	const vote = (id, anecdote) => {
		dispatch(addVote(id, anecdote));
		dispatch(
			showNotification({
				message: `you think that "${anecdote.content}" is funny? Yeah, i guess i think so😂`,
			})
		);
		setTimeout(() => {
			dispatch(hideNotification({ message: null }));
		}, 5000);
	};

	return anecdoteList.map(anecdote => {
		return (
			<div key={anecdote.id}>
				<div>{anecdote.content}</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
				</div>
			</div>
		);
	});
}
