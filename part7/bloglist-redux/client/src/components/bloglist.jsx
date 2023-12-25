/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import Blog from './blog';
import { LS_BLOGLIST_USER } from '../App';
import { useSelector } from 'react-redux';

export default function Bloglist({ onRemoveBlogBy }) {
	const [sortBy, setSortBy] = useState('desc');
	const blogs = useSelector((state) => {
		const copyBlogs = [...state.blogs];
		return sortBy === 'asc'
			? copyBlogs.sort((a, b) => a.likes - b.likes)
			: copyBlogs.sort((a, b) => b.likes - a.likes);
	});

	const userFromLocalStorage = useState(() =>
		JSON.parse(window.localStorage.getItem(LS_BLOGLIST_USER))
	);

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
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						onRemoveBlogBy={onRemoveBlogBy}
						user={userFromLocalStorage[0]}
					/>
				))}
			</ul>
		</>
	);
}
