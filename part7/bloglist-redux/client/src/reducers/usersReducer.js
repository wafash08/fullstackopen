import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/auth';

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload;
		},
	},
});

export const { setUsers } = usersSlice.actions;

export function getUsers() {
	return async (dispatch) => {
		const users = await getAllUsers();
		dispatch(setUsers(users));
	};
}

export default usersSlice.reducer;
