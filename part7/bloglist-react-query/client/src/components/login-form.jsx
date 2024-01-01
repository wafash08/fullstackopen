import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function LoginForm({ onLogin }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin({ username, password });
	};

	return (
		<Form onSubmit={handleSubmit} className='mt-4'>
			<Form.Group>
				<Form.Label htmlFor='username'>Username</Form.Label>
				<Form.Control
					type='text'
					name='username'
					id='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					data-test='username'
					required
				/>
			</Form.Group>
			<Form.Group className='mt-2'>
				<Form.Label htmlFor='password'>Password</Form.Label>
				<Form.Control
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					data-test='password'
					required
				/>
			</Form.Group>
			<Button
				className='mt-2'
				variant='primary'
				type='submit'
				data-test='login_button'
			>
				Login
			</Button>
			<p>
				You don't have an account yet? let's{' '}
				<Link to='signup' className='text-decoration-underline'>
					sign up!
				</Link>
			</p>
		</Form>
	);
}
