import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

function getId() {
	return (100000 * Math.random()).toFixed(0);
}

function asObject(anecdote) {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
}

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		voteAnecdote(state, action) {
			const anecdoteToVote = state.find(s => s.id === action.payload.id);
			if (!anecdoteToVote) {
				return `anecdote with ${id} is not found`;
			}
			const anecdoteAfterVote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};

			return state.map(anecdote =>
				anecdote.id === anecdoteAfterVote.id ? anecdoteAfterVote : anecdote
			);
		},
		createAnecdote(state, action) {
			const { content } = action.payload;
			return state.concat({ content, id: getId(), votes: 0 });
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
	anecdoteReducer.actions;
export default anecdoteReducer.reducer;
