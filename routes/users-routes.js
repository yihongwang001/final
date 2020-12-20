var express = require("express");
var router = express.Router();
var crypto = require("crypto");
const myDB = require("../db/usersDB.js");

router.get("/", async (req, res, next) => {
	const users = await myDB.getUsers();
	res.json(users);
});

router.post("/create", async (req, res) => {
	const user = req.body;

	const { username, password } = req.body;
	const salt = crypto.randomBytes(32).toString("hex");
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	console.log("user", user);

	await myDB.createUser({ username, password: genHash, salt });

	res.status(200).send({ inserted: true });
});

module.exports = router;
