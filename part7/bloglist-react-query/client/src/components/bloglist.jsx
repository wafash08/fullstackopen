/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import { useQuery } from 'react-query';
import Blog from './Blog';
import { LS_BLOGLIST_USER } from '../App';
import { getAll } from '../services/blogs';

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
	const userFromLocalStorage = useState(() =>
		JSON.parse(window.localStorage.getItem(LS_BLOGLIST_USER)),
	);

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
			<ul className='bloglist'>
				{sortedBlogs.map((blog) => (
					<Blog key={blog.id} blog={blog} user={userFromLocalStorage[0]} />
				))}
			</ul>
		</>
	);
}
