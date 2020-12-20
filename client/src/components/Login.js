import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// This function received the values from the form
		// The line below extract the two fields from the values object.

		const body = {
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
			console.log("Login.js success", success);

			if (success) {
				window.location.href = "/";
			} else {
				alert("Login Failed try again");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="container">
			<br />
			<br />
			<div className="row">
				<div className="col-8">
					<img
						src="https://cdngeneral.rentcafe.com/dmslivecafe/3/945388/20245%20N%2032nd%20Dr%20Phoenix%20AZ-large-004-25-Living%20Room-1500x1000-72dpi(1).jpg?crop=(11.999999999999943,18,289.3333333333326,200)&cropxunits=300&cropyunits=200&quality=85&scale=both&"
						height="600"
						width="1200"
						crop="fill"
						className="img-fluid"
						alt="login image"
					/>
				</div>
				<div className="col-4">
					<h1
						className="text-center"
						style={{
							color: "black",

							fontFamily: "Georgia",
							fontWeight: "bold",
						}}
					>
						Login{" "}
					</h1>

					<Form className="text-center" onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="username"
								placeholder="Username"
								value={username}
								onChange={(evt) =>
									setUsername(evt.target.value)
								}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(evt) =>
									setPassword(evt.target.value)
								}
							/>
						</Form.Group>

						<Button variant="dark" type="submit">
							Login
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Login;
