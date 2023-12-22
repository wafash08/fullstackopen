import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(_, action) {
			return action.payload;
		},
		hideNotification(_, action) {
			return action.payload;
		},
	},
});

export const { hideNotification, showNotification } = notificationSlice.actions;

export function setNotification(message, timeout) {
	console.log('message >> ', message);
	return async function (dispatch) {
		dispatch(showNotification(message));
		setTimeout(() => {
			dispatch(hideNotification(null));
		}, timeout * 1000);
	};
}

export default notificationSlice.reducer;
