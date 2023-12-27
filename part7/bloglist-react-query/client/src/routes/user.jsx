import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../services/users';

export default function User() {
	const params = useParams();
	const userID = params.id;
	const { data: user, isLoading } = useQuery({
		queryKey: ['user', userID],
		queryFn: () => fetchUserByID(userID),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ol>
				{user.blogs.map((blog) => {
					return (
						<li key={blog.id}>
							<p>{blog.title}</p>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
