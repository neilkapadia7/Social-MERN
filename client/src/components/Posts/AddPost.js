import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../Actions/postAction';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

const AddPost = ({ addPost }) => {
	useEffect(() => {
		M.AutoInit();
	}, []);

	const [body, setBody] = useState('');

	const onSubmit = () => {
		// e.preventDefault();

		if (body === '') {
			console.log('Add Something');
		} else {
			addPost({ body });

			M.toast({ html: 'New Post Added!' });

			setBody('');
		}
	};

	return (
		<div id='add-post' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h3>Add a New Post</h3>
				<div className='input-field'>
					<input
						type='text'
						name='body'
						value={body}
						onChange={(e) => setBody(e.target.value)}
					/>
					<label htmlFor='body' className='active'>
						Write Something Here...
					</label>
				</div>
				<div className='modal-footer'>
					<a
						href='#!'
						onClick={onSubmit}
						className='modal-close waves-effect blue waves-light btn'>
						Submit
					</a>
				</div>
			</div>
		</div>
	);
};

AddPost.propTypes = {
	addPost: PropTypes.func.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75%',
};

export default connect(null, { addPost })(AddPost);
