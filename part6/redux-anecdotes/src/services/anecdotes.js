import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export async function getAll() {
	const response = await axios.get(baseURL);
	return response.data;
}

export async function createNew(content) {
	const response = await axios.post(baseURL, { content, votes: 0 });
	return response.data;
}

export async function updateVote(id, anecdoteToVote) {
	const anecdoteAfterVote = {
		...anecdoteToVote,
		votes: anecdoteToVote.votes + 1,
	};
	const anecdote = await axios.put(`${baseURL}/${id}`, anecdoteAfterVote);
	return anecdote.data;
}
