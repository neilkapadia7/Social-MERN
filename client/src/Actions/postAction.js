import axios from 'axios';
import { POST_ERROR, POST_LOADING, POST_SUCCESS, GET_POSTS } from './types';

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
