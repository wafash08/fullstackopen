import { createContext, useContext, useReducer } from 'react';

// 1. bikin reducer
function reducer(state = null, action) {
	switch (action.type) {
		case 'SET': {
			return action.payload;
		}
		case 'CLEAR': {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}
const initialValue = { message: null, type: null };
// 2. bikin context
export const NotificationContext = createContext(initialValue);
NotificationContext.displayName = 'Notification Context';
// 3. bikin context provider
export function NotificationContextProvider({ children }) {
	const [notification, dispatch] = useReducer(reducer, initialValue);
	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{children}
		</NotificationContext.Provider>
	);
}
// 4. bikin hooks untuk mendapatkan value notification
export function useNotification() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw Error(
			`You have to use useNotification inside ${NotificationContext.displayName}`,
		);
	}
	return context[0];
}
// 5. bikin hooks untuk memodifikasi value notification
export function useNotify() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw Error(
			`You have to use useNotify inside ${NotificationContext.displayName}`,
		);
	}
	const dispatch = context[1];
	return ({ message, type, timeout = 5 }) => {
		dispatch({ type: 'SET', payload: { message, type } });
		setTimeout(() => {
			dispatch({ type: 'CLEAR', payload: { message: null, type: null } });
		}, 1000 * timeout);
	};
}
