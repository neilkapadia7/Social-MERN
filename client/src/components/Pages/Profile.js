import React from 'react';
import PropTypes from 'prop-types';
import AddPost from '../Posts/AddPost';

const Profile = (props) => {
	return (
		<div>
			<h3>Profile</h3>
			<AddPost />
		</div>
	);
};

Profile.propTypes = {};

export default Profile;
