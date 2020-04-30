import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentPost from '../Comments/CommentPost';
import v4 from 'uuid';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import UpdatePost from './UpdatePost';
import { deletePost } from '../../Actions/postAction';
import Moment from 'react-moment';
import LikesButton from './LikesButton';

const PostItem = (props) => {
	const {
		auth: { user },
		post,
		deletePost,
	} = props;

	const [comments, setComments] = useState(null);

	useEffect(() => {
		const comments = async () => {
			const res = await axios.get(`api/posts/comment/${post._id}`);
			setComments(res.data);
		};

		comments();
	}, [post]);

	const RemovePost = () => {
		deletePost(post._id);
	};

	return (
		<div className='postitem-div'>
			<div className='post-head'>
				<p className='post-author'>{post.author}</p>
				{user && user._id === post.user ? (
					<div className='update-remove-div'>
						<a href='#update-modal' className='modal-trigger update'>
							Edit
						</a>
						<a href='#!' onClick={RemovePost} className='remove'>
							Remove
						</a>
					</div>
				) : (
					''
				)}
			</div>
			<Moment className='post-date' fromNow>
				{post.date}
			</Moment>
			<h5 className='post-body'>{post.body}</h5>
			<LikesButton post={post} />
			<div className='comment-main-div'>
				{comments !== null ? (
					<CommentPost key={v4()} comments={comments} postid={post._id} />
				) : null}
			</div>
			<UpdatePost post={post} />
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostItem);
