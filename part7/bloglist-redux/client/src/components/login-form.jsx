import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/authReducer';

export default function LoginForm() {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const loginForm = e.target;
		const loginFormData = new FormData(loginForm);
		const user = {};
		for (const [key, value] of loginFormData.entries()) {
			user[key] = value;
		}
		dispatch(loginUser(user));
		loginForm.reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='username'>username</label>
					<input
						type='text'
						name='username'
						id='username'
						data-test='username'
					/>
				</div>
				<div>
					<label htmlFor='password'>password</label>
					<input
						type='password'
						name='password'
						id='password'
						data-test='password'
					/>
				</div>
				<button type='submit' data-test='login_button'>
					login
				</button>
			</form>
		</>
	);
}
