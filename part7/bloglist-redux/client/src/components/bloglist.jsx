/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import Blog from './blog';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectBlogsBySortBy = createSelector(
	(state) => state.blogs,
	(_, sortBy) => sortBy,
	(blogs, sortBy) => {
		const copyBlogs = [...blogs];
		return sortBy === 'asc'
			? copyBlogs.sort((a, b) => a.likes - b.likes)
			: copyBlogs.sort((a, b) => b.likes - a.likes);
	}
);

export default function Bloglist() {
	const [sortBy, setSortBy] = useState('desc');
	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) => selectBlogsBySortBy(state, sortBy));

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
					<Blog key={blog.id} blog={blog} user={user} />
				))}
			</ul>
		</>
	);
}
