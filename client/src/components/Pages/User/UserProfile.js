import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddBtn from '../../Posts/AddBtn';
import Moment from 'react-moment';

const UserProfile = (props) => {
	const { account } = props;

	// console.log(props.match.params.id);
	const [user, setUser] = useState(null);

	useEffect(() => {
		account.map((a) => (a._id === props.match.params.id ? setUser(a) : null));
	}, [props.match.params]);

	console.log(user);
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
					</div>
				</div>
			) : (
				<h3>Loading....</h3>
			)}
			<h2>User</h2>
		</div>
	);
};

UserProfile.propTypes = {
	account: PropTypes.array,
};

const mapStateToProps = (state) => ({
	account: state.auth.account,
});

export default connect(mapStateToProps, {})(UserProfile);
