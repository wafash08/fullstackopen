import { createSlice } from '@reduxjs/toolkit';
import { LS_BLOGLIST_USER, login } from '../services/auth';
import { setToken } from '../services/blogs';
import { setNotification } from './notificationReducer';

const authSlice = createSlice({
	name: 'auth',
	initialState: null,
	reducers: {
		onLogin(state, action) {
			return action.payload;
		},
		onLogout() {
			return null;
		},
		init(state, action) {
			return action.payload;
		},
	},
});

export const { init, onLogout, onLogin } = authSlice.actions;

export function initializeUser() {
	return (dispatch) => {
		const loggedInUser = localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			dispatch(init(user));
			setToken(user.token);
		}
	};
}

export function loginUser({ username, password }) {
	return async (dispatch) => {
		try {
			const user = await login({ username, password });
			localStorage.setItem(LS_BLOGLIST_USER, JSON.stringify(user));
			setToken(user.token);
			dispatch(onLogin(user));
		} catch (error) {
			console.log(error);
			dispatch(
				setNotification({
					message: 'wrong username or password',
					type: 'error',
				})
			);
		}
	};
}

export function logoutUser() {
	return async (dispatch) => {
		localStorage.removeItem(LS_BLOGLIST_USER);
		dispatch(onLogout());
	};
}

export default authSlice.reducer;
