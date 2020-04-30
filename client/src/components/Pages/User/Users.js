import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Users = ({ searchUser }) => {
	return (
		<Fragment>
			{searchUser !== null ? (
				searchUser.map((s) => (
					<div>
						<div>
							<h4>
								{s.firstName} {s.lastName}
							</h4>
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
	searchUser: PropTypes.object,
};

const mapStateToProps = (state) => ({
	searchUser: state.auth.searchUser,
});

export default connect(mapStateToProps, {})(Users);
