import React from "react";
import ReactPaginate from "react-paginate";
import { Nav } from "react-bootstrap";

const Pagination = (props) => {
	return (
		<Nav aria-label="Page navigation example">
			<ReactPaginate
				previousLabel={"<<"}
				nextLabel={">>"}
				pageCount={Math.ceil(props.totalPosts / props.postsPerPage)}
				pageRangeDisplayed={4}
				marginPagesDisplayed={4}
				onPageChange={props.handlePageClick}
				containerClassName="pagination-container"
				pageClassName="pagination-li"
				pageLinkClassName="pagination-a"
			></ReactPaginate>
		</Nav>
	);
};

export default Pagination;
