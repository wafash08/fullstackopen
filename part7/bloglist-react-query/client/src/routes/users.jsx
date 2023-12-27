import { useQuery } from 'react-query';
import { fetchAllUsers } from '../services/users';
import { Link } from 'react-router-dom';

export default function Users() {
	const { data: users, isLoading } = useQuery('users', fetchAllUsers);

	if (isLoading) {
		return <p>Loading...</p>;
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
