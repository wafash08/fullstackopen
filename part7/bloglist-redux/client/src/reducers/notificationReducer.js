import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		message: null,
		type: null,
	},
	reducers: {
		set(state, action) {
			return action.payload;
		},
		clear(state, action) {
			return action.payload;
		},
	},
});

export const { clear, set } = notificationSlice.actions;

/**
 *
 * @param {string} message Notification message
 * @param {number} timeout How long the notification appears
 * @returns
 */
export function setNotification({ message, type, timeout = 5 }) {
	return async function (dispatch) {
		dispatch(set({ message, type }));
		setTimeout(() => {
			dispatch(clear({ message: null, type: null }));
		}, 1000 * timeout);
	};
}

export default notificationSlice.reducer;
