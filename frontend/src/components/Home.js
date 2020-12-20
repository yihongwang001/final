import React, { useState, useEffect } from "react";
import Page from "./Page.js";
import Posts from "./Posts.js";
import SearchBar from "./SearchBar.js";
import SortBar from "./SortBar.js";

function Home() {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

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

	useEffect(() => {
		const getPosts = async () => {
			try {
				const _posts = await fetch("/api/posts").then((res) =>
					res.json()
				);
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

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const handlePageClick = ({ selected }) => {
		console.log(selected);
		setCurrentPage(selected + 1);
	};

	const processedPosts = processPosts(posts);
	const currentPosts = processedPosts.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	return (
		<div>
			<br />
			<h5>
				Welcome to SweetHome! Click SweetHome will lead you to the home
				page. Click New Houses will help you find the latest housing
				information. You need to login to leave any comments. Hope you
				can find your sweet home here.
			</h5>
			<br />
			<div className="row">
				<div className="col-8">
					<SearchBar
						handleSearchChange={handleSearchChange}
						handleSearchByChange={handleSearchByChange}
						searchBy={searchBy}
						search={search}
					></SearchBar>
				</div>
				<div className="col-4">
					<SortBar
						handleSortByChange={handleSortByChange}
						sortBy={sortBy}
					></SortBar>
				</div>
			</div>
			<br />
			<Posts posts={currentPosts}></Posts>
			<Page
				postsPerPage={postsPerPage}
				totalPosts={posts.length}
				handlePageClick={handlePageClick}
			></Page>
		</div>
	);
}

export default Home;
