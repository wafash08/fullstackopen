import { createSlice } from '@reduxjs/toolkit';
import { create, getAll } from '../services/blogs';

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		addBlog(state, action) {
			return [...state, action.payload];
		},
	},
});

export const { setBlogs, addBlog } = blogSlice.actions;

export function initializeBlog() {
	return async function (dispatch) {
		const blogs = await getAll();
		dispatch(setBlogs(blogs));
	};
}

export function createBlog(blog) {
	return async function (dispatch) {
		const newBlog = await create(blog);
		const newBlogWithUser = {
			...newBlog,
			user: {
				username: blog.user.username,
				name: blog.user.name,
			},
		};
		dispatch(addBlog(newBlogWithUser));
	};
}

export default blogSlice.reducer;
