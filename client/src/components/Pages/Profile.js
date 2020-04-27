import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddPost from '../Posts/AddPost';
import { connect } from 'react-redux';
import { getAuthPosts } from '../../Actions/postAction';
import PostItem from '../Posts/PostItem';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const Profile = ({ postState: { auth_posts, post_loading }, getAuthPosts }) => {
	useEffect(() => {
		// Initializes Materialize JS
		M.AutoInit();

		getAuthPosts();
	}, [getAuthPosts, M]);

	if (post_loading) {
		return <h3>Loading..</h3>;
	}

	return (
		<div>
			<div className='container'>
				<h3>Profile</h3>
				<AddPost />
				{auth_posts !== null
					? auth_posts.map((post) => (
							<Fragment key={post._id}>
								<PostItem key={post._id} post={post} />
							</Fragment>
					  ))
					: null}
			</div>
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
