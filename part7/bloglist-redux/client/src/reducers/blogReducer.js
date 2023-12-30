import { createSlice } from '@reduxjs/toolkit';
import {
	addComment,
	addLikeTo,
	create,
	getAll,
	remove,
} from '../services/blogs';
import { setNotification } from './notificationReducer';

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
			const blogToLike = state.find((s) => s.id === action.payload.id);
			const blogWithUpdatedLike = {
				...blogToLike,
				likes: action.payload.likes,
			};
			const stateAfterLike = state.map((s) =>
				s.id === action.payload.id ? blogWithUpdatedLike : s
			);
			return stateAfterLike;
		},
		removeBlog(state, action) {
			return state.filter((s) => s.id !== action.payload);
		},
		appendComment(state, action) {
			const blogToUpdate = state.find((b) => b.id === action.payload.blog);
			const newComment = {
				comment: action.payload.comment,
				id: action.payload.id,
			};
			const blogWithNewComment = {
				...blogToUpdate,
				comments: [...blogToUpdate.comments, newComment],
			};
			return state.map((b) =>
				b.id === action.payload.blog ? blogWithNewComment : b
			);
		},
	},
});

export const { setBlogs, addBlog, addLike, removeBlog, appendComment } =
	blogSlice.actions;

export function initializeBlog() {
	return async function (dispatch) {
		const blogs = await getAll();
		dispatch(setBlogs(blogs));
	};
}

export function createBlog(blog) {
	return async function (dispatch) {
		try {
			const newBlog = await create(blog);
			const newBlogWithUser = {
				...newBlog,
				user: {
					username: blog.user.username,
					name: blog.user.name,
				},
			};
			dispatch(addBlog(newBlogWithUser));
			dispatch(
				setNotification({
					message: `a new blog ${blog.title} by ${blog.author} added`,
					type: 'success',
				})
			);
		} catch (error) {
			console.log(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};
}

export function addLikeToBlog(id, blog) {
	return async function (dispatch) {
		try {
			const result = await addLikeTo(id, blog);
			const blogWithUser = {
				...result,
				user: {
					username: blog.user.username,
					name: blog.user.name,
				},
			};
			dispatch(addLike(blogWithUser));
		} catch (error) {
			console.error(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};
}

export function removeBlogByID(id) {
	return async function (dispatch) {
		try {
			await remove(id);
			dispatch(removeBlog(id));
		} catch (error) {
			console.error(error);
			dispatch(
				setNotification({
					message: error.response.data.error,
					type: 'error',
				})
			);
		}
	};
}

export function createComment(id, comment) {
	return async (dispatch) => {
		const response = await addComment({ id, comment });
		dispatch(appendComment(response));
	};
}

export default blogSlice.reducer;
