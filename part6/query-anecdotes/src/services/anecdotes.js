import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export async function getAnecdotes() {
	const response = await axios.get(baseURL);
	return response.data;
}
