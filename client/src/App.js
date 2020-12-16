import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "./pages/Home.js";
import PostDetails from "./pages/PostDetails.js";
import Navigation from "./components/Navigation.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import loginPage from "./pages/loginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import Emailme from "./pages/Emailme.js";
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
						<SinglePages />
					</Route>

					<Route path="/Register">
						<Register />
					</Route>

					<Route path="/login">
						<login />
					</Route>

					<Route path="/emailme">
						<Emailme />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
