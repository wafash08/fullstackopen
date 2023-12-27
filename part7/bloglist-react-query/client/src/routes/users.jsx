import { useQuery } from 'react-query';
import { fetchAllUsers } from '../services/users';

export default function Users() {
	const { data: users } = useQuery('users', fetchAllUsers);

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
								<td style={{ paddingRight: '10px' }}>{name}</td>
								<td>{blogs.length}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
