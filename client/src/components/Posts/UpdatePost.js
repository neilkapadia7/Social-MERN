import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../../Actions/postAction';

const UpdatePost = (props) => {
	const { post, updatePost } = props;

	const [post2, setPost] = useState({
		author: '',
		body: '',
		date: '',
		_id: '',
	});

	const { body } = post2;

	useEffect(() => {
		// Initializes Materialize JS
		M.AutoInit();

		setPost(post);
	}, [post]);

	const onSubmit = () => {
		console.log(body);
		console.log(post2);
		updatePost(post2);
		M.toast({ html: 'Post Updated!' });
	};

	const onChange = (e) => {
		setPost({ ...post2, [e.target.name]: e.target.value });
	};

	return (
		<div id='update-modal' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Enter Post Data</h4>
				<div className='input-field col s6'>
					<input
						type='text'
						value={body}
						name='body'
						onChange={onChange}
						placeholder='Add Post Content'
					/>
					<label htmlFor='body' className='active'>
						Update Post
					</label>
				</div>
			</div>
			<div className='modal-footer'>
				<a
					href='#!'
					onClick={onSubmit}
					className='modal-close waves-effect blue waves-light btn'>
					Enter
				</a>
			</div>
		</div>
	);
};

UpdatePost.propTypes = {
	updatePost: PropTypes.func.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75vh',
};

export default connect(null, { updatePost })(UpdatePost);
