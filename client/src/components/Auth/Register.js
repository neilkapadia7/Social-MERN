import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register, clearErrors, loadUser } from '../../Actions/authAction';
import PropTypes from 'prop-types';

const Register = (props) => {
	const {
		auth: { isAuthenticated, error },
		register,
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

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			password === ''
		) {
			console.log('Please Enter All The Fields');
		}

		register({
			firstName,
			lastName,
			email,
			password,
		});
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder='First Name'
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
					required
				/>
				<input
					type='text'
					placeholder='Last Name'
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
					required
				/>
				<input
					type='email'
					placeholder='Email ID'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<input type='submit' value='Register' />
			</form>
		</div>
	);
};

Register.propTypes = {
	auth: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register, clearErrors, loadUser })(
	Register
);
