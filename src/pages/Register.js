import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function SignupPage() {
	const [email, setEmail] = useState("");

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const createUser = async (evt) => {
		evt.preventDefault();
		if (password !== confirmPassword) {
			return;
		}
		const response = await fetch("/api/users/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}), // body data type must match "Content-Type" header
		});

		window.location.href = "/";
		console.log("need register", response);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-8">
					<img
						src="https://2utfff4d3dkt3biit53nsvep-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/MAIN-Blueground-Apartment-San-Francisco-990x660.jpg"
						height="600"
						width="1200"
						crop="fill"
						className="img-fluid"
						alt="signup image"
					/>
				</div>

				<div className="col-4">
					<h1 className="text-center">Register</h1>
					<Form className="text-center">
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								<h5>Email </h5>
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

						<Button
							variant="dark"
							type="submit"
							onClick={async (evt) => {
								// evt.preventDefault();

								const response = await fetch(
									"/api/users/create",
									{
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({
											email: email,
											username: username,
											password: password,
										}), // body data type must match "Content-Type" header
									}
								);

								console.log(
									"Please create a account",
									response
								);
							}}
						>
							Create account
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
