import React from 'react';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';

import Navbar from './components/Layout/Navbar';
import PrivateRoute from './routing/PrivateRoute';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<Provider store={store}>
			<div className='App'>
				<Router>
					<Navbar />
					<Switch>
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute exact path='/profile' component={Profile} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Router>
			</div>
		</Provider>
	);
};

export default App;
