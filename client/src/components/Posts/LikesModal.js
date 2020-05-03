import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const LikesModal = ({ likes, post_id }) => {
	useEffect(() => {
		M.AutoInit();
	});

	return (
		<div id={`likes-modal-${post_id}`} className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Likes</h4>
				{likes.map((like) => (
					<div className='row' key={like.user_id}>
						<p>{like.user_name}</p>
					</div>
				))}
			</div>
			<div className='modal-footer'>
				<a href='#!' className='modal-close waves-effect blue waves-light btn'>
					Close
				</a>
			</div>
		</div>
	);
};

LikesModal.propTypes = {
	likes: PropTypes.array.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75vh',
};

export default LikesModal;
