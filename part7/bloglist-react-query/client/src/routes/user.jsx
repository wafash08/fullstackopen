import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
			<h3>Added blogs</h3>
			{user.blogs.length === 0 ? (
				<p>No blogs added</p>
			) : (
				<ListGroup as='ol' numbered>
					{user.blogs.map((blog) => {
						return (
							<ListGroup.Item key={blog.id}>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			)}
		</div>
	);
}
