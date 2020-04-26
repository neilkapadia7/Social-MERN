import axios from 'axios';
import { POST_ERROR, POST_LOADING, POST_SUCCESS } from './types';

export const getPosts = () => async (dispatch) => {
	dispatch({ type: POST_LOADING });

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.get('/api/posts/all', config);

		dispatch({ type: POST_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: POST_ERROR, payload: err.response });
	}
};
