var express = require("express");
var router = express.Router();

const myDB = require("../db/postsDB.js");

/* GET home page. */
router.get("/", async (req, res, next) => {
	const posts = await myDB.getPosts();
	res.json(posts);
});

router.get("/:pid", async (req, res, next) => {
	const postId = req.params.pid;
	const post = await myDB.getPostById(postId);
	console.log("await to get post from myDB", post);
	res.json(post);
});

module.exports = router;
