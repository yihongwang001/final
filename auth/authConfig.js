const Strategy = require("passport-local").Strategy;
const myDB = require("../db/usersDB.js");
require("dotenv").config();
const passport = require("passport");
const crypto = require("crypto");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
	uri: process.env.MONGO_URL || "mongodb://localhost:27017",
	collection: "sessions",
});
module.exports = function configurePassport(app) {
	passport.use(
		new Strategy(async function (username, password, cb) {
			console.log("Authenticating", username, password);

			try {
				const user = await myDB.findByUsername(username);
				
				if (!user) {
					console.log("User not found");
					return cb(null, false);
				}

				const hashedPassword = crypto
					.pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
					.toString("hex");
				if (user.password !== hashedPassword) {
					console.log("Wrong password");
					return cb(null, false);
				}

				console.log("User athenticated");
				return cb(null, user);
			} catch (err) {
				console.log("Error auth", err);
				return cb(err, null);
			}
		})
	);

	passport.serializeUser(function (user, cb) {
		console.log("serializig...", user);
		cb(null, user.username);
	});

	passport.deserializeUser(async function (username, cb) {
		try {
			console.log("deserializing...", username);
			const user = await myDB.findByUsername(username);
			cb(null, user);
		} catch (err) {
			cb(err);
		}
	});

	app.use(
		session({
			secret: process.env.SECRET || "not really a secret",
			resave: true,
			saveUninitialized: true,
			cookie: {
				secure: false,
				maxAge: 6000000,
			},
			store: store,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
};
