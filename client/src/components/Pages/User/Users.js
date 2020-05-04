import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddBtn from '../../Posts/AddBtn';

const Users = ({ searchUser }) => {
	if (searchUser === null) {
		return <h5>Please Type in the SearcBox</h5>;
	}

	return (
		<Fragment>
			<AddBtn />
			{searchUser !== null && searchUser.length > 0 ? (
				searchUser.map((s) => (
					<div key={s._id} className='search-user-div'>
						<div>
							<Link to={`/user/profile/${s._id}`}>
								<h4>
									{s.firstName} {s.lastName}
								</h4>
							</Link>
							<p>{s.email}</p>
							<p>{s.location}</p>
							<p>{s.website}</p>
						</div>
					</div>
				))
			) : (
				<h4>No Users</h4>
			)}
		</Fragment>
	);
};

Users.propTypes = {
	searchUser: PropTypes.array,
};

const mapStateToProps = (state) => ({
	searchUser: state.auth.searchUser,
});

export default connect(mapStateToProps, {})(Users);
