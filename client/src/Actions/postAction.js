import axios from 'axios';
import {
	POST_ERROR,
	POST_LOADING,
	POST_SUCCESS,
	GET_POSTS,
	GET_AUTH_POSTS,
	UPDATE_POST,
	DELETE_POST,
	LIKE_SUCCESS,
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

export const updatePost = (post) => async (dispatch) => {
	console.log('Update Called!');

	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put(`/api/posts/${post._id}`, post, config);

		dispatch({ type: UPDATE_POST, payload: res.data });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};

export const deletePost = (id) => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		await axios.delete(`/api/posts/${id}`, config);

		dispatch({ type: DELETE_POST, payload: id });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};

export const like = (post) => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.put(`/api/posts/like/${post._id}`, post, config);

		dispatch({ type: LIKE_SUCCESS, payload: res.data });
	} catch (err) {
		console.log(err);
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};
