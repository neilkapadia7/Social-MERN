import {
	SET_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	LOGIN_SUCCESS,
	AUTH_ERROR,
	USER_LOADED,
	USER_INFO_FAIL,
	USER_INFO_SUCCESS,
	GET_ALL_USERS,
	USER_ERROR,
	FILTER_USER,
	ADD_FOLLOWING,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
	dispatch({ type: SET_LOADING });

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

export const setUserInfo = (userInfo) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put(`api/users/${userInfo._id}`, userInfo, config);

		dispatch({ type: USER_INFO_SUCCESS, payload: res.data });
	} catch (err) {
		console.log(err.response);
		dispatch({ type: USER_INFO_FAIL, payload: err.response.data.msg });
	}
};

export const getAllUsers = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users');

		dispatch({ type: GET_ALL_USERS, payload: res.data });
	} catch (err) {
		dispatch({ type: USER_ERROR, payload: err.response });
	}
};

export const filterUser = (search, users) => (dispatch) => {
	const filtered = users.filter((user) =>
		user.firstName.toLowerCase().includes(search.toLowerCase())
	);

	dispatch({ type: FILTER_USER, payload: filtered });
};

export const addFollower = (formData) => async (dispatch) => {
	dispatch({ type: SET_LOADING });

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put(
			`/api/users/following/${formData.followData.followers.user_id}`,
			formData,
			config
		);

		console.log(res.data);

		// dispatch({ type: ADD_FOLLOWING, payload: res.data });
	} catch (err) {
		console.log(err.response);
		dispatch({ type: USER_ERROR, payload: err.response.data.msg });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
