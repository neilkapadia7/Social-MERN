import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../Actions/authAction';
import { Link } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
	// useEffect(() => {
	// 	if (localStorage.token) {
	// 		loadUser();
	// 	}
	// }, [loadUser]);

	const onClick = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>
				<Link to='/profile'>
					{user && user.firstName + ' ' + user.lastName}
				</Link>
			</li>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='#!' onClick={onClick}>
					Logout
				</Link>
			</li>
		</Fragment>
	);

	const GuestLinks = (
		<Fragment>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Sign Up</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar-fixed'>
			<nav>
				<div className='nav-wrapper'>
					<a href='#1' className='brand-logo'>
						PalmBook
					</a>

					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{isAuthenticated ? authLinks : GuestLinks}
					</ul>
				</div>
			</nav>
		</div>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	// loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
