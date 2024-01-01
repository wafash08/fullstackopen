import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

const Togglable = forwardRef(({ buttonLable, children }, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : 'block' };
	const showWhenVisible = { display: visible ? 'block' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div className='mt-4 mb-2'>
			<div style={hideWhenVisible}>
				<Button
					variant='primary'
					type='button'
					onClick={toggleVisibility}
					data-test='togglable_button'
				>
					{buttonLable}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<Button variant='danger' type='button' onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

export default Togglable;
