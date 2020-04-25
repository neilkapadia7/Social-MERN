import {
	SET_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	LOGIN_SUCCESS,
	AUTH_ERROR,
	USER_LOADED,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({ type: USER_LOADED, payload: res.data });
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: err.response });
	}
};

export const register = (formData) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/users', formData, config);

		dispatch({ type: REGISTER_SUCCESS, payload: res.data });

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: REGISTER_FAIL, payload: err });
		console.log(err.response.data.msg);
	}
};

export const login = (formData) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('api/auth', formData, config);

		dispatch({ type: LOGIN_SUCCESS, payload: res.data });

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
