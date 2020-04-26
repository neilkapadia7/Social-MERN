import axios from 'axios';
import {
	POST_ERROR,
	POST_LOADING,
	POST_SUCCESS,
	GET_POSTS,
	GET_AUTH_POSTS,
} from './types';

export const getPosts = () => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.get('/api/posts/all', config);

		dispatch({ type: GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};

export const addPost = (formData) => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/posts', formData, config);

		dispatch({ type: POST_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response.data.msg });
	}
};

export const getAuthPosts = () => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.get('/api/posts', config);

		dispatch({ type: GET_AUTH_POSTS, payload: res.data });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};
