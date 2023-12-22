import { createSlice } from '@reduxjs/toolkit';
import { createNew, getAll, updateVote } from '../services/anecdotes';

const anecdoteReducer = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		voteAnecdote(state, action) {
			const anecdoteAfterVote = action.payload;

			return state.map(anecdote =>
				anecdote.id === anecdoteAfterVote.id ? anecdoteAfterVote : anecdote
			);
		},
		appendAnecdote(state, action) {
			return state.concat(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
	anecdoteReducer.actions;

export function initializeAnecdotes() {
	return async function (dispatch) {
		const anecdotes = await getAll();
		dispatch(setAnecdotes(anecdotes));
	};
}

export function createAnecdote(anecdote) {
	return async function (dispatch) {
		const newAnecdote = await createNew(anecdote);
		dispatch(appendAnecdote(newAnecdote));
	};
}

export function addVote(id, anecdote) {
	return async function (dispatch) {
		const updatedAnecdote = await updateVote(id, anecdote);
		dispatch(voteAnecdote(updatedAnecdote));
	};
}

export default anecdoteReducer.reducer;
