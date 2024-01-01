import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { useSetUser } from '../contexts/user-context';
import { signup } from '../services/auth';

export default function SignUp() {
	console.log('hello');
	const dispatchUser = useSetUser();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const signUpForm = e.target;
		const signUpData = new FormData(signUpForm);
		const user = {};
		for (const [key, value] of signUpData.entries()) {
			user[key] = value;
		}
		const singedUpUser = await signup(user);
		dispatchUser({ type: 'SET', payload: singedUpUser });
		signUpForm.reset();
		navigate('/');
	};
	return (
		<Container>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSubmit} className='mt-4'>
				<Form.Group className='mb-2'>
					<Form.Label htmlFor='name'>Name</Form.Label>
					<Form.Control type='text' name='name' id='name' data-test='name' />
				</Form.Group>
				<Form.Group className='mb-2'>
					<Form.Label htmlFor='username'>Username</Form.Label>
					<Form.Control
						type='text'
						name='username'
						id='username'
						data-test='username'
					/>
				</Form.Group>
				<Form.Group className='mb-4'>
					<Form.Label htmlFor='password'>Password</Form.Label>
					<Form.Control
						type='password'
						name='password'
						id='password'
						data-test='password'
					/>
				</Form.Group>
				<Button variant='primary' type='submit' data-test='signup_button'>
					Sign Up
				</Button>
			</Form>
		</Container>
	);
}
