import React from "react";
import { Form, Col, InputGroup } from "react-bootstrap";

function Search(props) {
	return (
		<Form.Group>
			<Form.Row className="align-items-right">
				<Form.Label
					className="mr-sm-2"
					htmlFor="inlineFormCustomSelect"
				>
					<h5>Search by</h5>
				</Form.Label>
				<Col xs="auto">
					<Form.Control
						as="select"
						className="mr-sm-2"
						id="inlineFormCustomSelect"
						value={props.searchBy}
						onChange={props.handleSearchByChange}
						custom
					>
						<option value="housing">House size</option>
						<option value="price">Price</option>
						<option value="mapaddress">Address</option>
					</Form.Control>
				</Col>

				<Col>
					<Form.Label
						htmlFor="inlineFormInputGroupSearch"
						srOnly
					></Form.Label>
					<InputGroup>
						<Col sm="5">
							<Form.Control
								id="inlineFormInputGroupSearch"
								placeholder={
									"Key words about your ideal house "
								}
								value={props.search}
								onChange={props.handleSearchChange}
							/>
						</Col>
					</InputGroup>
				</Col>
			</Form.Row>
		</Form.Group>
	);
}

export default Search;
