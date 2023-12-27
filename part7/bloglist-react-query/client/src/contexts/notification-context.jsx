import { createContext, useContext, useReducer } from 'react';

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

export const NotificationContext = createContext(initialValue);
NotificationContext.displayName = 'Notification Context';

export default function NotificationContextProvider({ children }) {
	const [notification, dispatch] = useReducer(reducer, initialValue);
	return (
		<NotificationContext.Provider value={[notification, dispatch]}>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotification() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw Error(
			`You have to use useNotification inside ${NotificationContext.displayName}`,
		);
	}
	return context[0];
}

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
