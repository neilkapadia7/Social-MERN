import React from 'react';
import setAuthToken from './utils/setAuthToken';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/Layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
const GuestApp = () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	return (
		<Router>
			<Navbar />
			<Switch>
				<div className='container'>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
				</div>
			</Switch>
		</Router>
	);
};

export default GuestApp;
