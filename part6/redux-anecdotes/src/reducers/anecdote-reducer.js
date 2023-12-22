import { createSlice } from '@reduxjs/toolkit';
import { getAll } from '../services/anecdotes';

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
			return state.concat(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
	anecdoteReducer.actions;

export function initializeAnecdotes() {
	return async function (dispatch) {
		console.log('dispatch >> ', dispatch);
		const anecdotes = await getAll();
		dispatch(setAnecdotes(anecdotes));
	};
}

export default anecdoteReducer.reducer;
