import { createSlice } from '@reduxjs/toolkit';
import { addLikeTo, create, getAll, remove } from '../services/blogs';

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
		addLike(state, action) {
			const stateAfterLike = state.map((s) =>
				s.id === action.payload.id ? action.payload : s
			);
			return stateAfterLike;
		},
		removeBlog(state, action) {
			return state.filter((s) => s.id !== action.payload);
		},
	},
});

export const { setBlogs, addBlog, addLike, removeBlog } = blogSlice.actions;

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

export function addLikeToBlog(id, blog) {
	return async function (dispatch) {
		const result = await addLikeTo(id, blog);
		const blogWithUser = {
			...result,
			user: {
				username: blog.user.username,
				name: blog.user.name,
			},
		};
		dispatch(addLike(blogWithUser));
	};
}

export function removeBlogByID(id) {
	return async function (dispatch) {
		await remove(id);
		dispatch(removeBlog(id));
	};
}

export default blogSlice.reducer;
