import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

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
			<p className='comment-title'>Comments</p>
			{comments2 !== null
				? comments2.map((comment) => (
						<div key={comment._id} className='commentitem-div'>
							<Link to={`/user/profile/${comment.user_id}`}>
								<p className='comment-user'>{comment.user}</p>
							</Link>
							<Moment className='comment-date' fromNow>
								{comment.date}
							</Moment>
							<p className='comment-body'>{comment.body}</p>
						</div>
				  ))
				: null}
			<div className='comment-input-div'>
				<input
					type='text'
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder='Add a Comment'
					className='comment-text'
				/>
				<button onClick={addComment} className='comment-button'>
					Submit
				</button>
			</div>
		</div>
	);
};

CommentPost.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default CommentPost;
