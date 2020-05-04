import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

const LikesModal = ({ likes, post_id }) => {
	useEffect(() => {
		M.AutoInit();
	});

	return (
		<div id={`likes-modal-${post_id}`} className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Likes</h4>
				<div className='modal-content'>
					{likes.map((like) => (
						<div className='row likes-row' key={like.user_id}>
							<i className='material-icons likes-icon'>thumb_up</i>
							<p className='modal-para'>{like.user_name}</p>
						</div>
					))}
				</div>
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
