import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFollower } from '../../Actions/authAction';

const Follow = ({ guestUser, user, addFollower }) => {
	const [didFollow, setDidFollow] = useState(false);

	useEffect(() => {
		if (guestUser !== null) {
			guestUser.followers.map((f) => {
				if (f.user_id === user._id) {
					setDidFollow(true);
				}
			});
		}
		// eslint-disable-next-line
	}, [guestUser, user._id]);

	const onFollow = () => {
		let followers = [
			{ user_id: user._id, user_name: user.firstName + ' ' + user.lastName },
			...guestUser.followers,
		];

		let following = [
			{
				user_id: guestUser._id,
				user_name: guestUser.firstName + ' ' + guestUser.lastName,
			},
			...user.following,
		];

		const formData = {
			followData: {
				authData: { _id: user._id, following: following },

				guestData: { _id: guestUser._id, followers: followers },
			},
		};

		addFollower(formData);
		setDidFollow(!didFollow);
	};

	const onUnFollow = () => {
		let followers = guestUser.followers.filter((f) => f.user_id !== user._id);

		let following = user.following.filter((f) => f.user_id !== guestUser._id);

		const formData = {
			followData: {
				authData: { _id: user._id, following: following },

				guestData: { _id: guestUser._id, followers: followers },
			},
		};

		addFollower(formData);
		setDidFollow(!didFollow);
	};

	return (
		<div>
			{didFollow ? (
				<a href='#!' onClick={onUnFollow} className='following'>
					Following
				</a>
			) : (
				<a href='#!' onClick={onFollow} className='edit-profile'>
					Follow
				</a>
			)}
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
