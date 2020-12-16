import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination.js";
import Posts from "../components/Posts.js";
import SearchBar from "../components/SearchBar.js";
import SortBar from "../components/SortBar.js";

function Home() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 8;

	const [search, setSearch] = useState("");
	const [searchBy, setSearchBy] = useState("neighborhood");
	const [sortBy, setSortBy] = useState("price");

	const processPosts = (_posts) => {
		return _posts
			.map((p) => {
				p.images = p.images.map(function (img) {
					img = img.replace("50x50c", "600x450");
					return img;
				});
				return p;
			})
			.filter((p) => {
				if (search === "") {
					return true;
				}
				if (!p[searchBy]) {
					return false;
				}
				return p[searchBy]
					.replace(",", "")
					.toLowerCase()
					.includes(search.toLowerCase());
			})
			.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
	};

	// we can not use async to pass in to useEffect
	useEffect(() => {
		// get the posts from the backend
		const getPosts = async () => {
			try {
				const _posts = await fetch("/api/posts").then((res) =>
					res.json()
				);
				// const processedPosts = processPosts(_posts);
				setPosts(_posts);
			} catch (err) {
				console.log("error ", err);
			}
		};

		getPosts();
	}, []);

	function handleSearchChange(evt) {
		setSearch(evt.target.value);
	}

	function handleSearchByChange(evt) {
		setSearchBy(evt.target.value);
	}

	function handleSortByChange(evt) {
		setSortBy(evt.target.value);
	}

	// took out the () in location
	// props.posts.map((p) => (p = p.location.replace("(", "")));
	// };

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	// Change page
	const handlePageClick = ({ selected }) => {
		console.log(selected);
		setCurrentPage(selected + 1);
	};

	const processedPosts = processPosts(posts);
	const currentPosts = processedPosts.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	// console.log(processedPosts);
	return (
		<div>
			<br />
			<br />

			<SearchBar
				handleSearchChange={handleSearchChange}
				handleSearchByChange={handleSearchByChange}
				searchBy={searchBy}
				search={search}
			></SearchBar>

			<SortBar
				handleSortByChange={handleSortByChange}
				sortBy={sortBy}
			></SortBar>
			<br />

			<Posts posts={currentPosts}></Posts>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={posts.length}
				handlePageClick={handlePageClick}
			></Pagination>
		</div>
	);
}

export default Home;
