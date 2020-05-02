import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, getAllUsers } from '../../Actions/authAction';
import { getPosts } from '../../Actions/postAction';
import PostItem from '../Posts/PostItem';
import AddBtn from '../Posts/AddBtn';
import M from 'materialize-css/dist/js/materialize.min.js';
import AddPost from '../Posts/AddPost';

const Home = ({
	postState: { posts, post_loading },
	loadUser,
	getPosts,
	getAllUsers,
}) => {
	useEffect(() => {
		loadUser();

		getPosts();
		getAllUsers();

		M.AutoInit();
	}, [loadUser, getPosts, getAllUsers]);

	if (post_loading) {
		return <h3>Loading..</h3>;
	}

	return (
		<div>
			<AddBtn />
			<AddPost />
			<div className='post-main-div'>
				{posts !== null
					? posts.map((post) => <PostItem key={post._id} post={post} />)
					: null}
			</div>
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	getAllUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	postState: state.posts,
});

export default connect(mapStateToProps, { loadUser, getPosts, getAllUsers })(
	Home
);
