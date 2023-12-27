/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import { useQuery } from 'react-query';
import { LS_BLOGLIST_USER } from '../App';
import { getAll } from '../services/blogs';
import { Link } from 'react-router-dom';

export default function Bloglist() {
	const {
		data: blogs,
		error,
		isLoading,
		isError,
	} = useQuery({
		queryKey: 'blogs',
		queryFn: getAll,
		retry: 1,
	});
	const [sortBy, setSortBy] = useState('desc');

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	let sortedBlogs =
		sortBy === 'asc'
			? blogs.sort((a, b) => a.likes - b.likes)
			: blogs.sort((a, b) => b.likes - a.likes);

	const sortByLikes = () => {
		switch (sortBy) {
			case 'asc': {
				setSortBy('desc');
				break;
			}

			case 'desc': {
				setSortBy('asc');
				break;
			}
		}
	};

	const styles = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<>
			<button
				type='button'
				onClick={sortByLikes}
				data-test='sortbylikes_button'
			>
				sort by likes "{sortBy}" (
				{sortBy === 'asc' ? 'least to most' : 'most to least'})
			</button>
			<ul className='bloglist' style={{ listStyle: 'none' }}>
				{sortedBlogs.map((blog) => (
					<li key={blog.id} style={styles}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
