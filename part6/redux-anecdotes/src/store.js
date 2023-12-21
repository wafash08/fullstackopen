import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdote-reducer';
import filterReducer from './reducers/filter-reducer';
import notificationReducer from './reducers/notification-reducer';

export const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
});
