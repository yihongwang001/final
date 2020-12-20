import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./css/nav.css";
function Navigation({ user }) {
	const signOut = async () => {
		const response = await fetch("/api/auth/logout");
		if (response.ok) {
			window.location.href = "/";
		}
	};

	return (
		<Navbar bg="light" expand="lg" fixed="top">
			<Nav className="container-fluid">
				<Nav.Link>
					<Link to={"/emailme"}>
						{" "}
						<h4
							style={{
								color: "black",

								fontFamily: "Georgia",
								fontWeight: "bold",
							}}
						>
							New houses !
						</h4>
					</Link>
				</Nav.Link>

				<Nav.Link className="ml-auto">
					{" "}
					<Link to={"/"}>
						<i>
							<h1
								style={{
									fontFamily: "Georgia",
									fontWeight: "bold",
								}}
							>
								Sweet Home
							</h1>
						</i>
					</Link>
				</Nav.Link>
				{user ? (
					<Nav.Link className="ml-auto">
						<Button variant="light" onClick={signOut}>
							<h4
								style={{
									color: "black",

									fontFamily: "Georgia",
									fontWeight: "bold",
								}}
							>
								Sign out
							</h4>
						</Button>
					</Nav.Link>
				) : (
					<Nav className="ml-auto">
						<Nav.Link>
							<Link to={"/register"}>
								<h4
									style={{
										color: "black",

										fontFamily: "Georgia",
										fontWeight: "bold",
									}}
								>
									Register
								</h4>
							</Link>
						</Nav.Link>

						<Nav.Link>
							<Link to={"/login"}>
								{" "}
								<h4
									style={{
										color: "black",

										fontFamily: "Georgia",
										fontWeight: "bold",
									}}
								>
									Login
								</h4>
							</Link>
						</Nav.Link>
					</Nav>
				)}
			</Nav>
		</Navbar>
	);
}

export default Navigation;
