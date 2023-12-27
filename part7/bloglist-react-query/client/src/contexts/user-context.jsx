import { createContext, useContext, useEffect, useReducer } from 'react';
import { setToken } from '../services/blogs';
import { LS_BLOGLIST_USER } from '../App';

function reducer(state = null, action) {
	switch (action.type) {
		case 'SET': {
			window.localStorage.setItem(
				LS_BLOGLIST_USER,
				JSON.stringify(action.payload),
			);
			setToken(action.payload.token);
			return action.payload;
		}
		case 'CLEAR': {
			window.localStorage.removeItem(LS_BLOGLIST_USER);
			return null;
		}
		default: {
			return state;
		}
	}
}

const UserContext = createContext(null);
UserContext.displayName = 'User Context';

export default function UserContextProvider({ children }) {
	const [user, dispatch] = useReducer(reducer, null);
	useEffect(() => {
		const loggedInUser = window.localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			dispatch({ type: 'SET', payload: user });
			setToken(user.token);
		}
	}, []);
	return (
		<UserContext.Provider value={[user, dispatch]}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw Error(`You have to use useUser inside ${UserContext.displayName}`);
	}
	return context[0];
}

export function useSetUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw Error(`You have to use useSetUser inside ${UserContext.displayName}`);
	}
	return context[1];
}
