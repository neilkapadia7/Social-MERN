import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<Provider store={store}>
			<div className='App'></div>
		</Provider>
	);
};

export default App;
