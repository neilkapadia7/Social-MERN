import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFollower } from '../../Actions/authAction';

const Follow = ({ guestUser, user, addFollower }) => {
	const onFollow = () => {
		const formData = {
			followData: {
				following: {
					user_id: guestUser._id,
					user_name: guestUser.firstName + ' ' + guestUser.lastName,
				},

				followers: {
					user_id: user._id,
					user_name: user.firstName + ' ' + user.lastName,
				},
			},
		};

		addFollower(formData);
	};

	return (
		<div>
			<a onClick={onFollow}>Follow</a>
		</div>
	);
};

Follow.propTypes = {
	addFollower: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { addFollower })(Follow);
