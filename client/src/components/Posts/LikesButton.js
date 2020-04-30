import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { like } from '../../Actions/postAction';

const LikesButton = ({ post, user, like }) => {
	const { likes } = post;

	const onClick = () => {
		console.log('Clicked!');

		let _id = post._id;
		let likes2 = [
			{ user_id: user._id, user_name: user.firstName + ' ' + user.lastName },
			...likes,
		];

		let post2 = {
			_id,
			likes: likes2,
		};

		like(post2);
	};

	return (
		<div style={{ width: '100%' }}>
			<a style={{ cursor: 'pointer' }} onClick={onClick}>
				Like
			</a>
		</div>
	);
};

LikesButton.propTypes = {
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	like: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { like })(LikesButton);
