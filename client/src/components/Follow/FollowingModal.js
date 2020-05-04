import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const FollowingModal = ({ following, user_id }) => {
	useEffect(() => {
		M.AutoInit();
	});

	return (
		<div id={`following-modal-${user_id}`} className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Following</h4>
				<div className='modal-content'>
					{following.map((like) => (
						<div className='row likes-row' key={like.user_id}>
							<i className='material-icons likes-icon'>person</i>
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

FollowingModal.propTypes = {
	following: PropTypes.array.isRequired,
	user_id: PropTypes.string.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75vh',
};

export default FollowingModal;
