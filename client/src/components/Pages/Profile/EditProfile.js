import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';
import { setUserInfo } from '../../../Actions/authAction';

const EditProfile = (props) => {
	const { user, setUserInfo } = props;

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		bio: '',
		location: '',
		website: '',
		birthdate: '',
	});

	const { firstName, lastName, bio, location, website, birthdate } = userData;

	useEffect(() => {
		M.AutoInit();

		setUserData(user);
	}, [user]);

	const onSubmit = () => {
		if (firstName === '' || lastName === '') {
			M.toast({ html: 'Name Cannot Be Empty' });
		} else if (!website === '' && website.isUri()) {
			M.toast({ html: 'Enter A Valid URL' });
		} else {
			setUserInfo(userData);

			M.toast({ html: 'Profile Updated Successfully!' });
		}
	};

	const onChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	return (
		<div id='edit-profile' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h3>Edit Profile</h3>
				<div className='input-field'>
					<input
						type='text'
						name='firstName'
						value={firstName}
						onChange={onChange}
						required
					/>
					<label htmlFor='firstName' className='active'>
						First Name
					</label>
				</div>

				<div className='input-field'>
					<input
						type='text'
						name='lastName'
						value={lastName}
						onChange={onChange}
						required
					/>
					<label htmlFor='lastName' className='active'>
						Last Name
					</label>
				</div>

				<div className='input-field'>
					<input type='text' name='bio' value={bio} onChange={onChange} />
					<label htmlFor='bio' className='active'>
						Bio
					</label>
				</div>

				<div className='input-field'>
					<input
						type='text'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<label htmlFor='location' className='active'>
						Location
					</label>
				</div>

				<div className='input-field'>
					<input
						type='text'
						name='website'
						value={website}
						onChange={onChange}
					/>
					<label htmlFor='website' className='active'>
						Website
					</label>
				</div>

				<div className='input-field'>
					<input
						type='date'
						name='birthdate'
						value={birthdate}
						onChange={onChange}
						className='datepicker'
					/>
					<label htmlFor='birthdate' className='active' onChange={onChange}>
						Birth Date
					</label>
				</div>

				<div className='modal-footer'>
					<a
						href='#!'
						onClick={onSubmit}
						className='modal-close waves-effect blue waves-light btn'>
						Submit
					</a>
				</div>
			</div>
		</div>
	);
};

EditProfile.propTypes = {
	user: PropTypes.object.isRequired,
	setUserInfo: PropTypes.func.isRequired,
};

const modalStyle = {
	width: '75%',
	height: '75%',
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { setUserInfo })(EditProfile);
