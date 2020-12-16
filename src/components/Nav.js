import { Navbar, Nav, Form, Button } from "react-bootstrap";

function Navigation() {
	return (
		<Navbar bg="light" expand="rg">
			<Nav className="justify-content-start bg-black">
				<Nav.Link href="/">
					<i>
						<h1
							style={{
								color: "black",

								fontFamily: "Georgia",
								fontWeight: "bold",
							}}
						>
							Sweet Home
						</h1>
					</i>
				</Nav.Link>
			</Nav>
			<Nav className="justify-content-end ">
				<Nav.Link href="/signup">
					<h4
						style={{
							color: "black",

							fontFamily: "Georgia",
							fontWeight: "bold",
						}}
					>
						Register
					</h4>
				</Nav.Link>
				<Nav.Link href="/signin">
					<h4
						style={{
							color: "black",

							fontFamily: "Georgia",
							fontWeight: "bold",
						}}
					>
						Login
					</h4>
				</Nav.Link>
				<Nav.Link href="/emailme">
					<h5
						style={{
							fontFamily: "Georgia",
							fontWeight: "bold",
						}}
					>
						New houses !
					</h5>
				</Nav.Link>
			</Nav>{" "}
		</Navbar>
	);
}

export default Navigation;
