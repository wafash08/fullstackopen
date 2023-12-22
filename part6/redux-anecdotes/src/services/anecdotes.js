import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

export async function getAll() {
	const response = await axios.get(baseURL);
	return response.data;
}
