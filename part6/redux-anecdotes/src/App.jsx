import AnecdoteList from './components/anecdote-list';
import AnecdoteForm from './components/anecdote-form';

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
