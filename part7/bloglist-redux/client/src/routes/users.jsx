import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/auth';
import { Link } from 'react-router-dom';

export default function Users() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		async function getUsers() {
			const allUsers = await getAllUsers();
			setUsers(allUsers);
		}
		getUsers();
	}, []);

	if (!users) {
		return <p>loading...</p>;
	}

	const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length);

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
					{sortedUsers.map(({ id, name, blogs }) => {
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
