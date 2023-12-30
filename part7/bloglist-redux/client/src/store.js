import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import usersReducer from './reducers/usersReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		users: usersReducer,
		auth: authReducer,
	},
});
