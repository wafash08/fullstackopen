import axios from 'axios';

const baseUrl = '/api/users';

export async function fetchAllUsers() {
	const response = await axios.get(baseUrl);
	return response.data.data;
}

export async function fetchUserByID(id) {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data.data;
}
