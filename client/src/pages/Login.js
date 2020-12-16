import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Longin(props) {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// The useHistory hook gives you access to the history instance that you may use to navigate.
	// its like a link object but dont need a visual component on screen
	let history = useHistory();

	const handleSubmit = async (values) => {
		// This function received the values from the form
		// The line below extract the two fields from the values object.
		const { email, username, password } = values;
		var body = {
			email: email,
			username: username,
			password: password,
		};
		console.log(body);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(body),
		};

		try {
			const response = await fetch("/api/auth/login", options);
			const success = await response.json();

			if (success) {
				window.location.href = "/";
			} else {
				alert("Login Failed");
			}
		} catch (error) {}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-8">
					<img
						src="https://cdngeneral.rentcafe.com/dmslivecafe/3/945388/20245%20N%2032nd%20Dr%20Phoenix%20AZ-large-004-25-Living%20Room-1500x1000-72dpi(1).jpg?crop=(11.999999999999943,18,289.3333333333326,200)&cropxunits=300&cropyunits=200&quality=85&scale=both&"
						height="600"
						width="1200"
						crop="fill"
						className="img-fluid"
						alt="signup image"
					/>
				</div>

				<div className="col-4">
					<h1 className="text-center">Login </h1>
					<Form className="text-center" onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								<h5>Email address</h5>
							</Form.Label>
							<Form.Control
								type="email"
								required
								placeholder="Enter email"
								value={email}
								onChange={(evt) => setEmail(evt.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicUsername">
							<Form.Label>
								<h5>Username</h5>
							</Form.Label>
							<Form.Control
								type="username"
								required
								placeholder="Username"
								value={username}
								onChange={(evt) =>
									setUsername(evt.target.value)
								}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								<h5>Password</h5>
							</Form.Label>
							<Form.Control
								type="password"
								required
								placeholder="Password"
								value={password}
								onChange={(evt) =>
									setPassword(evt.target.value)
								}
							/>
						</Form.Group>

						<Button variant="dark" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Longin;
