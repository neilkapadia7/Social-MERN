import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../Actions/authAction';

const Home = ({ loadUser }) => {
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	return (
		<div>
			<h1>Home</h1>
		</div>
	);
};

Home.propTypes = {
	loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Home);
