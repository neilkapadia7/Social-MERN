import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const FollowersModal = ({ followers, user_id }) => {
	useEffect(() => {
		M.AutoInit();
	});

	return (
		<div id={`followers-modal-${user_id}`} className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Followers</h4>
				{followers.map((like) => (
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

FollowersModal.propTypes = {
	followers: PropTypes.array.isRequired,
	user_id: PropTypes.string.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75vh',
};

export default FollowersModal;
