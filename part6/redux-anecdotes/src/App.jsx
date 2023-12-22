import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Notification from './components/notification';
import Filter from './components/filter';
import AnecdoteList from './components/anecdote-list';
import AnecdoteForm from './components/anecdote-form';
import { getAll } from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdote-reducer';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)));
	}, []);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
