import { useQuery } from 'react-query';
import { fetchAllUsers } from '../services/users';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default function Users() {
	const { data: users, isLoading } = useQuery('users', fetchAllUsers);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length);

	return (
		<div>
			<h2>Users</h2>
			<Table bordered hover>
				<thead>
					<tr>
						<th>
							<p>Name</p>
						</th>
						<th>
							<p>Blogs Created</p>
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedUsers.map(({ id, name, blogs }) => {
						return (
							<tr key={id}>
								<td>
									<Link to={`/users/${id}`}>{name}</Link>
								</td>
								<td>{blogs.length}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
