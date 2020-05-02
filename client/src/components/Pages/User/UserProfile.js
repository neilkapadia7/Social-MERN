import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts, removeUserPosts } from '../../../Actions/postAction';

import AddBtn from '../../Posts/AddBtn';
import Moment from 'react-moment';
import PostItem from '../../Posts/PostItem';
import Follow from '../../Follow/Follow';

const UserProfile = (props) => {
	const { account, getUserPosts, removeUserPosts, posts } = props;

	// console.log(props.match.params.id);
	const [user, setUser] = useState(null);

	useEffect(() => {
		account.map((a) => (a._id === props.match.params.id ? setUser(a) : null));

		getUserPosts(props.match.params.id);

		return () => {
			removeUserPosts();
		};
	}, [props.match.params]);

	return (
		<div>
			<AddBtn />
			{user !== null ? (
				<div className='profile-main-div'>
					<h2 className='profile-name'>
						{user.firstName} {user.lastName}
					</h2>
					<p className='profile-email'>{user.email}</p>
					{user.bio && <p className='profile-bio'>{user.bio}</p>}

					<div className='profile-details-div'>
						<p className='profile-joined'>
							<i className='material-icons profile-icon'>date_range</i> Joined{' '}
							<Moment format='MMMM YYYY'>{user.date}</Moment>
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
							<a
								className='profile-website'
								href={user.website}
								target='_blank'>
								<i className='material-icons profile-icon'>link</i>{' '}
								{user.website}
							</a>
						)}
						<div>
							<p>Followers: {user.followers.length}</p>
							<p>Following: {user.following.length}</p>
						</div>
						<div>
							<Follow />
						</div>
					</div>
				</div>
			) : (
				<h3>Loading....</h3>
			)}
			<div className='post-main-div'>
				{posts !== null
					? posts.map((post) => (
							<Fragment key={post._id}>
								<PostItem key={post._id} post={post} />
							</Fragment>
					  ))
					: null}
			</div>
		</div>
	);
};

UserProfile.propTypes = {
	account: PropTypes.array,
	getUserPosts: PropTypes.func.isRequired,
	removeUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	account: state.auth.account,
	posts: state.posts.user_posts,
});

export default connect(mapStateToProps, { getUserPosts, removeUserPosts })(
	UserProfile
);
