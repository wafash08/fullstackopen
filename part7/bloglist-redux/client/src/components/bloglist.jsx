/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

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
			<ul className='bloglist'>
				{blogs.map((blog) => (
					<li key={blog.id} style={styles}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
