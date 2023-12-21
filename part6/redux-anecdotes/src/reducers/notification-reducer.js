import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(_, action) {
			return action.payload.message;
		},
		hideNotification(_, action) {
			return action.payload.message;
		},
	},
});

export const { hideNotification, showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
