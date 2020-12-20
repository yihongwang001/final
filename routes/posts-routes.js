var express = require("express");
var router = express.Router();

const myDB = require("../db/postsDB.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
	const posts = await myDB.getPosts();
	res.json(posts);
});

/* GET the postDetails page. */
router.get("/:pid", async (req, res, next) => {
	const postId = req.params.pid;
	const post = await myDB.getPostById(postId);
	console.log("await to get post from myDB", post);
	res.json(post);
});

router.post("/post/:postId/comment", async (req, res) => {
	if (req.isAuthenticated()) {
		console.log("user", req.user);
		const { comment } = req.body;
		const returnedComment = await myDB.postComment(
			req.params.postId,
			req.user.username,
			comment
		);
		console.log("Comment", returnedComment);

		res.json(returnedComment);
	} else {
		res.status(401).json("Please log in");
	}
});

module.exports = router;
