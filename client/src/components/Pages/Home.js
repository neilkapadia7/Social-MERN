import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../Actions/authAction';
import { getPosts } from '../../Actions/postAction';
import PostItem from '../Posts/PostItem';

const Home = ({ postState: { posts, post_loading }, loadUser, getPosts }) => {
	useEffect(() => {
		loadUser();

		getPosts();
	}, [loadUser, getPosts]);

	if (post_loading) {
		return <h3>Loading..</h3>;
	}

	return (
		<div>
			<h1>Home</h1>
			{posts !== null
				? posts.map((post) => <PostItem key={post._id} post={post} />)
				: null}
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	postState: state.posts,
});

export default connect(mapStateToProps, { loadUser, getPosts })(Home);
