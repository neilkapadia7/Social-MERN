import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../Actions/postAction';

const AddPost = ({ addPost }) => {
	const [body, setBody] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		if (body === '') {
			console.log('Add Something');
		} else {
			addPost({ body });

			setBody('');
		}
	};

	return (
		<div>
			<h3>Add a New Post</h3>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder='Write Something Here....'
				/>
				<input type='submit' value='Post' />
			</form>
		</div>
	);
};

AddPost.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(AddPost);
