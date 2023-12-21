import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		show(_, action) {
			return action.payload.message;
		},
		hide(_, action) {
			return action.payload.message;
		},
	},
});

export const { hide, show } = notificationSlice.actions;
export default notificationSlice.reducer;
