import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AddPost from '../Posts/AddPost';
import { connect } from 'react-redux';
import { getAuthPosts } from '../../Actions/postAction';
import PostItem from '../Posts/PostItem';

const Profile = ({ postState: { auth_posts, post_loading }, getAuthPosts }) => {
	useEffect(() => {
		getAuthPosts();
	}, [getAuthPosts]);

	if (post_loading) {
		return <h3>Loading..</h3>;
	}

	return (
		<div>
			<h3>Profile</h3>
			<AddPost />
			{auth_posts !== null
				? auth_posts.map((post) => <PostItem key={post._id} post={post} />)
				: null}
		</div>
	);
};

Profile.propTypes = {
	getAuthPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	postState: state.posts,
});

export default connect(mapStateToProps, { getAuthPosts })(Profile);
