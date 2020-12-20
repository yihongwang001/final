import React, { useState, useEffect } from "react";
import { Card, Carousel, Form, Button } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";

function SinglePost() {
	const postId = useParams().postId;

	const url = window.location.href;

	console.log(url);
	const [post, setPost] = useState({});
	const [comment, setComment] = useState("");
	const html = post.postingbody;

	const getPost = async () => {
		try {
			const _post = await fetch(`/api/posts/${postId}`).then((res) =>
				res.json()
			);
			console.log("post?", _post);
			setPost(_post);
		} catch (err) {
			console.log("error ", err);
		}
	};

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
			}),
		});

		getPost();
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<div role="main">
			<Card className="text-center">
				<br />
				<br />
				<Card.Header>
					<strong>
						<Card.Title>{post.titletextonly}</Card.Title>
					</strong>
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
														style={{
															height: "520px",
															width: "100rem",
														}}
														className="d-block w-100"
														src={img}
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
							rows={5}
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
							{comment.description}
							<footer className="blockquote-footer">
								{comment.username}{" "}
							</footer>
						</Card.Body>
					))}
			</Card>
		</div>
	);
}

export default SinglePost;
