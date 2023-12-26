import { createSlice } from '@reduxjs/toolkit';
import { login } from '../services/auth';

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		clearUser() {
			return null;
		},
	},
});

export const { clearUser, setUser } = userSlice.actions;

export function loginOf({ username, password }) {
	return async function (dispatch) {
		const loggedInUser = await login({ username, password });
		dispatch(setUser(loggedInUser));
	};
}

export default userSlice.reducer;
