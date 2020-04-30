import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterUser } from '../../Actions/authAction';

const Search = ({ account, filterUser }) => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (account !== null) {
			setUsers(account);
		}
	}, [account]);

	const onSubmit = (e) => {
		e.preventDefault();

		// const filteredUsers = users.filter((user) =>
		// 	user.firstName.toLowerCase().includes(search.toLowerCase())
		// );
		filterUser(search, users);
	};

	return (
		<nav className='#2962ff blue accent-4'>
			<div className='nav-wrapper'>
				<form onSubmit={onSubmit}>
					<div className='input-field'>
						<input
							id='search'
							type='search'
							placeholder='Seach Users'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							required
						/>
						<label className='label-icon' htmlFor='search'>
							<i className='material-icons' type='submit'>
								search
							</i>
						</label>
						<i className='material-icons'>close</i>
					</div>
				</form>
			</div>
		</nav>
	);
};

Search.propTypes = {
	account: PropTypes.array,
	filterUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	account: state.auth.account,
});

export default connect(mapStateToProps, { filterUser })(Search);
