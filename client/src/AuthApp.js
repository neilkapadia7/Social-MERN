import React from 'react';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile/Profile';
import Users from './components/Pages/User/Users';
import UserProfile from './components/Pages/User/UserProfile';

import './App.css';

import Navbar from './components/Layout/Navbar';
import PrivateRoute from './routing/PrivateRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';

const AuthApp = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	return (
		<Router>
			<Navbar />
			<Switch>
				<div className='container'>
					<PrivateRoute exact path='/' component={Home} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/users' component={Users} />
					<PrivateRoute
						exact
						path='/user/profile/:id'
						component={UserProfile}
					/>
				</div>
			</Switch>
		</Router>
	);
};

export default AuthApp;
