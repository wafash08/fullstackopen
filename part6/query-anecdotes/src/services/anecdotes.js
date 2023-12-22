import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export async function getAnecdotes() {
	const response = await axios.get(baseURL);
	return response.data;
}

export async function createNewAnecdote(anecdote) {
	const response = await axios.post(baseURL, { content: anecdote, votes: 0 });
	return response.data;
}
