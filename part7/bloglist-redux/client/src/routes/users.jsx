import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectSortedUsers = createSelector(
	(state) => state.users,
	(users) => {
		const copy = [...users];
		return copy.sort((a, b) => b.blogs.length - a.blogs.length);
	}
);

export default function Users() {
	const users = useSelector((state) => selectSortedUsers(state));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	if (!users) {
		return <p>loading...</p>;
	}

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>
							<h3>blogs created</h3>
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ id, name, blogs }) => {
						return (
							<tr key={id}>
								<td style={{ paddingRight: '10px' }}>
									<Link to={`/users/${id}`}>{name}</Link>
								</td>
								<td>{blogs.length}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
