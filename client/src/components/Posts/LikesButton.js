import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { like } from '../../Actions/postAction';
import LikesModal from './LikesModal';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

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

		M.AutoInit();
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
		<Fragment>
			<a href={`#likes-modal-${post._id}`} className='modal-trigger'>
				{post.likes.length} Likes
			</a>
			<LikesModal likes={likes} post_id={post._id} />
			<div style={{ width: '100%' }}>
				<a
					className={didLike ? 'liked' : 'unliked'}
					onClick={didLike ? onUnlike : onLike}>
					Like
				</a>
			</div>
		</Fragment>
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
