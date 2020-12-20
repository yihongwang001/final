import React from 'react';
import { Form, Col } from 'react-bootstrap';

function Search(props) {
	return (
		<Form>
			<Form.Row className="align-items-right">
				<Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
					<h5>Sort by</h5>
				</Form.Label>
				<Col xs="auto">
					<Form.Control
						as="select"
						className="mr-sm-2"
						id="inlineFormCustomSelect"
						value={props.sortBy}
						onChange={props.handleSortByChange}
						custom
					>
						<option value="date">Date: recent to before</option>
						<option value="price">Price: low to high</option>
					</Form.Control>
				</Col>
			</Form.Row>
		</Form>
	);
}

export default Search;
