import axios from 'axios';
const baseUrl = '/api/blogs';

export async function getAll() {
	const request = await axios.get(baseUrl);
	const response = await request.data;
	return response.data;
}

export async function getBlogByID(id) {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data.data;
}

let token = null;

export function setToken(newToken) {
	token = `Bearer ${newToken}`;
}

export async function create(newBlog) {
	const request = await axios.post(baseUrl, newBlog, {
		headers: { Authorization: token },
	});
	const response = await request.data;
	return response.data;
}

export async function addLikeTo(id, blog) {
	const request = await axios.put(`${baseUrl}/${id}`, blog);
	const response = await request.data;
	return response.data;
}

export async function remove(id) {
	const request = await axios.delete(`${baseUrl}/${id}`, {
		headers: { Authorization: token },
	});
	const response = request.data;
	return response.data;
}

export async function addComment({ id, comment }) {
	const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
	return response.data.data;
}
