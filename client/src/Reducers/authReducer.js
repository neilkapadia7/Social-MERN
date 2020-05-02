import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	SET_LOADING,
	REGISTER_FAIL,
	LOGIN_FAIL,
	AUTH_ERROR,
	LOGOUT,
	CLEAR_ERRORS,
	USER_LOADED,
	USER_INFO_SUCCESS,
	USER_INFO_FAIL,
	GET_ALL_USERS,
	USER_ERROR,
	FILTER_USER,
	ADD_FOLLOWING,
} from '../Actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,
	account: null,
	searchUser: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				error: null,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case USER_INFO_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
				error: null,
			};
		case USER_INFO_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case GET_ALL_USERS:
			return {
				...state,
				account: action.payload,
			};
		case FILTER_USER:
			return {
				...state,
				searchUser: action.payload,
			};
		case ADD_FOLLOWING:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case USER_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
