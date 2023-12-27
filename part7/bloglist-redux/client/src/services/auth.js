import axios from 'axios';
const loginUrl = '/api/login';
const usersUrl = '/api/users';

export const LS_BLOGLIST_USER = 'loggedBloglistUser';

export async function login({ username, password }) {
	const response = await axios.post(loginUrl, { username, password });
	const user = await response.data;
	window.localStorage.setItem(LS_BLOGLIST_USER, JSON.stringify(user.data));
	return user.data;
}

export function logout() {
	window.localStorage.removeItem(LS_BLOGLIST_USER);
}

export async function getAllUsers() {
	const response = await axios.get(usersUrl);
	return response.data.data;
}

export async function getUserByID(id) {
	const response = await axios.get(`${usersUrl}/${id}`);
	return response.data.data;
}
