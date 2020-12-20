import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "./components/Home.js";
import SinglePost from "./components/SinglePost.js";
import Navigation from "./components/Navigation.js";
import Emailme from "./components/Emailme.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
	const [user, setUser] = useState(null);

	function getUser() {
		fetch("/api/auth/getUser")
			.then((res) => res.json())
			.then((_user) => {
				if (_user.username) setUser(_user);
			});
	}

	useEffect(getUser, []);

	return (
		<div class="container">
			<Router>
				<Navigation user={user} />
				<br />
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/posts/:postId" exact>
						<SinglePost />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/emailme">
						<Emailme />
					</Route>
					<Route path="/signout"></Route>
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
