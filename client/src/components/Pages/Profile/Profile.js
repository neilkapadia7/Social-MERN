import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthPosts } from '../../../Actions/postAction';
import { getAllUsers } from '../../../Actions/authAction';
import PostItem from '../../Posts/PostItem';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import AddBtn from '../../Posts/AddBtn';
import Moment from 'react-moment';
import EditProfile from './EditProfile';
import FollowersModal from '../../Follow/FollowersModal';
import FollowingModal from '../../Follow/FollowingModal';

const Profile = ({
	auth: { user },
	postState: { auth_posts, post_loading },
	getAuthPosts,
	getAllUsers,
}) => {
	const { firstName, lastName, email, date } = user;

	useEffect(() => {
		getAuthPosts();
		getAllUsers();

		// Initializes Materialize JS
		M.AutoInit();
	}, [getAuthPosts, getAllUsers]);

	if (post_loading) {
		return <h3>Loading..</h3>;
	}

	return (
		<div>
			<div className='profile-main-div'>
				<EditProfile />
				<a href='#edit-profile' className='modal-trigger edit-profile'>
					Edit Profile
				</a>
				<h2 className='profile-name'>
					{firstName} {lastName}
				</h2>
				<p className='profile-email'>{email}</p>
				{user.bio && <p className='profile-bio'>{user.bio}</p>}

				<div className='profile-details-div'>
					<p className='profile-joined'>
						<i className='material-icons profile-icon'>date_range</i> Joined{' '}
						<Moment format='MMMM YYYY'>{date}</Moment>
					</p>
					{user.birthdate && (
						<p className='profile-birthdate'>
							<i className='material-icons profile-icon'>person</i> Born{' '}
							<Moment format='D MMMM YYYY'>{user.birthdate}</Moment>
						</p>
					)}
					{user.location && (
						<p className='profile-location'>
							<i className='material-icons profile-icon'>location_on</i>{' '}
							{user.location}
						</p>
					)}
					{user.website && (
						<a className='profile-website' href={user.website} target='_blank'>
							<i className='material-icons profile-icon'>link</i> {user.website}
						</a>
					)}
				</div>
				<div className='profile-follow-div'>
					<FollowersModal followers={user.followers} user_id={user._id} />
					<FollowingModal following={user.following} user_id={user._id} />
					<a
						href={`#followers-modal-${user._id}`}
						className='modal-trigger followers-para'>
						<span className='strong-follow'>{user.followers.length}</span>{' '}
						Followers
					</a>
					<a
						href={`#following-modal-${user._id}`}
						className='modal-trigger following-para'>
						<span className='strong-follow'>{user.following.length}</span>{' '}
						Following
					</a>
				</div>
			</div>
			<AddBtn />
			<div className='post-main-div'>
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
	getAllUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	postState: state.posts,
	auth: state.auth,
});

export default connect(mapStateToProps, { getAuthPosts, getAllUsers })(Profile);
