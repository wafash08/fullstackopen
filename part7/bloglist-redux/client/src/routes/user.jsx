import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByID } from '../services/auth';

export default function User() {
	const params = useParams();
	const userID = params.id;
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			const response = await getUserByID(userID);
			setUser(response);
		}

		getUser();
	}, [userID]);

	if (!user) {
		return <p>loading...</p>;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map((blog) => {
					return (
						<li key={blog.id}>
							<p>{blog.title}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
