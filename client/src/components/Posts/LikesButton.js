import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { like } from '../../Actions/postAction';

const LikesButton = ({ post, user, like }) => {
	const { likes } = post;
	const [didLike, setDidLike] = useState(false);

	useEffect(() => {
		if (user !== null) {
			post.likes.map((like) => {
				if (like.user_id === user._id) {
					setDidLike(true);
				}
			});
		}
		// eslint-disable-next-line
	}, [post, user]);

	const onLike = () => {
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
		setDidLike(!didLike);
	};

	const onUnlike = () => {
		let _id = post._id;
		let likes2 = likes.filter((like) => like.user_id !== user._id);

		let post2 = {
			_id,
			likes: likes2,
		};

		like(post2);
		setDidLike(!didLike);
	};

	return (
		<div style={{ width: '100%' }}>
			<a
				className={didLike ? 'liked' : 'unliked'}
				onClick={didLike ? onUnlike : onLike}>
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
