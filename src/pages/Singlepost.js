import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ReactHtmlParser from "react-html-parser";
import { Carousel, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SinglePage() {
	const postId = useParams().postId;

	// const url = window.location.href;
	const url = "https://sfbay.craigslist.org/";

	console.log(url);
	const [post, setPost] = useState({});
	const [comment, setComment] = useState("");
	const html = post.postingbody;

	// get the posts from the backend
	const getPost = async () => {
		try {
			const _post = await fetch(`/api/posts/${postId}`).then((res) =>
				res.json()
			);
			setPost(_post);
		} catch (err) {
			console.log("error ", err);
		}
	};

	// load the database and clean up on server sideconst handleSubmit = async (e) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("comment", comment);
		const response = await fetch(`/api/posts/post/${post._id}/comment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				comment,
			}), // body data type must match "Content-Type" header
		});

		getPost();
	};
	useEffect(() => {
		getPost();
	}, []);

	return (
		<div role="main">
			<Card>
				<Card.Header className="text-center">
					<Card.Title>{post.titletextonly}</Card.Title>
				</Card.Header>
				<Card.Body>
					<div className="indiv-img col-xs-6">
						<Carousel>
							{Object.keys(post).length > 0
								? post.images
										.map(function (img) {
											img = img.replace(
												"50x50c",
												"600x450"
											);
											return img;
										})
										.map((img) => {
											return (
												<Carousel.Item>
													<img
														className="d-block w-100"
														src={img}
														style={{
															height: "800px",
														}}
														alt="housing"
													/>
												</Carousel.Item>
											);
										})
								: null}
						</Carousel>
					</div>
					<p>{ReactHtmlParser(html)}</p>
				</Card.Body>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicComment">
						<Form.Label className="text-center">
							<h3>Share your views</h3>
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							onChange={(evt) => setComment(evt.target.value)}
							value={comment}
						/>
					</Form.Group>
					<Button variant="dark" type="submit">
						Submit
					</Button>
				</Form>
				{post.comments &&
					post.comments.map((comment) => (
						<Card.Body>
							——{comment.username}
							{comment.description}
						</Card.Body>
					))}
			</Card>
		</div>
	);
}

export default SinglePage;
