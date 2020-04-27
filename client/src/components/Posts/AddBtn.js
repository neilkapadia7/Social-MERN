import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import AddPost from './AddPost';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddBtn = () => {
	useEffect(() => {
		M.AutoInit();
	});

	return (
		<div className='fixed-action-btn'>
			<a
				href='#add-post'
				className='btn-floating btn-large blue darken-2 modal-trigger'>
				<i className='large material-icons'>add</i>
			</a>
			<AddPost />
		</div>
	);
};

export default AddBtn;
