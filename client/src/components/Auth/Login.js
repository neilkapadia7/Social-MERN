import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors, loadUser } from '../../Actions/authAction';
import PropTypes from 'prop-types';
// import Navbar from '../Layout/Navbar';

const Login = (props) => {
	const {
		auth: { isAuthenticated, error, loading },
		login,
		clearErrors,
		loadUser,
	} = props;

	useEffect(() => {
		if (localStorage.token) {
			loadUser();
		}
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error) {
			console.log(error);
			clearErrors();
		}
	}, [isAuthenticated, error, loadUser, props.history, clearErrors]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			console.log('Please Enter All The Fields');
		}

		login({
			email,
			password,
		});
	};

	if (loading) {
		return <h3>Loading</h3>;
	}

	return (
		<Fragment>
			{/* <Navbar />
			<div className='container'> */}
			<div className='auth-main-div'>
				<h2>Login</h2>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						placeholder='Email ID'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
						className='auth-textfield'
					/>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
						className='auth-textfield'
					/>
					<input type='submit' value='Login' className='auth-submit' />
				</form>
			</div>
			{/* </div> */}
		</Fragment>
	);
};

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { login, clearErrors, loadUser })(
	Login
);
