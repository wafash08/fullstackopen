/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET': {
			return action.payload.message;
		}
		case 'CLEAR': {
			return null;
		}
		default: {
			return state;
		}
	}
};

export const notificationContext = createContext();

notificationContext.displayName = 'Notification Context';

export const NotificationContextProvider = props => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
	);

	return (
		<notificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</notificationContext.Provider>
	);
};

export function useNotification() {
	const context = useContext(notificationContext);
	if (!context) {
		throw Error(
			`You have to use notificationContext inside ${notificationContext.displayName}`
		);
	}
	console.log('context >> ', context);
	console.log('context displayName >> ', notificationContext.displayName);
	return context[0];
}

export function useNotify() {
	const context = useContext(notificationContext);
	if (!context) {
		throw Error(
			`You have to use notificationContext inside ${notificationContext.displayName}`
		);
	}

	return context[1];
}
