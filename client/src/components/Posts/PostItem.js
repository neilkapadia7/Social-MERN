import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentPost from '../Comments/CommentPost';
import v4 from 'uuid';

const PostItem = (props) => {
	const { post } = props;

	const [comments, setComments] = useState(null);

	useEffect(() => {
		const comments = async () => {
			const res = await axios.get(`api/posts/comment/${post._id}`);
			setComments(res.data);
		};

		comments();
	}, []);

	return (
		<div>
			<p>{post.author}</p>
			<p>{post.date}</p>
			<h4>{post.body}</h4>
			<div>
				{comments !== null ? (
					<CommentPost key={v4()} comments={comments} postid={post._id} />
				) : null}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export default PostItem;
