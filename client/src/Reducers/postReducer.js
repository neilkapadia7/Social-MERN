import {
	POST_ERROR,
	POST_SUCCESS,
	POST_LOADING,
	GET_POSTS,
	GET_AUTH_POSTS,
	UPDATE_POST,
	DELETE_POST,
	LIKE_SUCCESS,
} from '../Actions/types';

const initialState = {
	posts: null,
	post_loading: false,
	post_error: null,
	auth_posts: null,
	current: null,
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
				auth_posts:
					state.auth_posts === null
						? null
						: [action.payload, ...state.auth_posts],
				post_loading: false,
			};
		case UPDATE_POST:
		case LIKE_SUCCESS:
			return {
				...state,
				auth_posts:
					state.auth_posts === null
						? null
						: state.auth_posts.map((post) =>
								post._id === action.payload._id ? action.payload : post
						  ),
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
				post_loading: false,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
				auth_posts:
					state.auth_posts === null
						? null
						: state.auth_posts.filter((post) => post._id !== action.payload),
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
