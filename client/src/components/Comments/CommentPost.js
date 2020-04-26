import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CommentPost = (props) => {
	const { comments, postid } = props;
	// console.log(postid);

	const [newComment, setNewComment] = useState('');
	const [comments2, setComments] = useState(null);

	useEffect(() => {
		setComments(comments);
	}, [comments]);

	const addComment = async () => {
		if (newComment === '') {
			console.log('Please Add A Comment');
		} else {
			let body = newComment;

			let data = { body };

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post(
				`/api/posts/comment/${postid}`,
				data,
				config
			);

			setComments([res.data, ...comments2]);

			setNewComment('');
		}
	};

	return (
		<div>
			{comments2 !== null
				? comments2.map((comment) => (
						<div key={comment._id}>
							<p>{comment.user}</p>
							<p>{comment.body}</p>
						</div>
				  ))
				: null}

			<input
				type='text'
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				placeholder='Add a Comment'
			/>
			<button onClick={addComment}>Submit</button>
		</div>
	);
};

CommentPost.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default CommentPost;
