import {
	POST_ERROR,
	POST_SUCCESS,
	POST_LOADING,
	GET_POSTS,
	GET_AUTH_POSTS,
} from '../Actions/types';

const initialState = {
	posts: null,
	post_loading: false,
	post_error: null,
	auth_posts: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				post_loading: false,
			};
		case GET_AUTH_POSTS:
			return {
				...state,
				auth_posts: action.payload,
				post_loading: false,
			};
		case POST_SUCCESS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
				auth_posts: [action.payload, state.auth_posts],
				post_loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				post_error: action.payload,
				post_loading: false,
			};
		case POST_LOADING:
			return {
				...state,
				post_loading: true,
			};
		default:
			return state;
	}
};
