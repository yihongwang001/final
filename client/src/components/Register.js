import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Register() {
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
		console.log("Please create a account", response);
	};

	return (
		<div className="container">
			<br />
			<br />
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
					<h1
						className="text-center"
						style={{
							color: "black",

							fontFamily: "Georgia",
							fontWeight: "bold",
						}}
					>
						Register
					</h1>{" "}
					<Form className="text-center" onSubmit={createUser}>
						<Form.Group>
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
						<Form.Group>
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
						<Form.Group>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(evt) =>
									setConfirmPassword(evt.target.value)
								}
							/>
						</Form.Group>
						<Button
							variant="dark"
							type="submit"
							className="text-center"
						>
							Create account
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Register;
