import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentPost from '../Comments/CommentPost';
import v4 from 'uuid';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import UpdatePost from './UpdatePost';
import { deletePost } from '../../Actions/postAction';

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
	}, [post._id]);

	const RemovePost = () => {
		deletePost(post._id);
	};

	return (
		<div>
			<p style={{ fontWeight: 900 }}>{post.author}</p>
			<p>{post.date}</p>
			<h5>{post.body}</h5>
			{user && user._id === post.user ? (
				<div>
					<a href='#update-modal' className='modal-trigger'>
						Edit
					</a>
					<a href='#!' onClick={RemovePost}>
						Remove
					</a>
				</div>
			) : (
				''
			)}
			<div>
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
