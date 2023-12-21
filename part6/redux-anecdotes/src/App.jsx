import Notification from './components/notification';
import Filter from './components/filter';
import AnecdoteList from './components/anecdote-list';
import AnecdoteForm from './components/anecdote-form';

const App = () => {
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
