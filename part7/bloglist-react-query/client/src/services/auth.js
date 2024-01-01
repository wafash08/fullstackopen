import axios from 'axios';
const loginUrl = '/api/login';
const signupUrl = '/api/users';

export async function login({ username, password }) {
	const request = await axios.post(loginUrl, { username, password });
	const response = await request.data;
	return response.data;
}

export async function signup({ name, username, password }) {
	const response = await axios.post(signupUrl, { name, username, password });
	return response.data.data;
}
