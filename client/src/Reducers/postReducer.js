import {
	POST_ERROR,
	POST_SUCCESS,
	POST_LOADING,
	GET_POSTS,
} from '../Actions/types';

const initialState = {
	posts: null,
	post_loading: false,
	post_error: null,
	comments: null,
	comment_loading: false,
	comment_error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				post_loading: false,
			};
		case POST_SUCCESS:
			return {
				...state,
				posts: [action.payload, ...state.posts],
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
