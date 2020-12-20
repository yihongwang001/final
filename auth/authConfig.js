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
				// Didn't find the user
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

	// Configure Passport authenticated session persistence.
	//
	// In order to restore authentication state across HTTP requests, Passport needs
	// to serialize users into and deserialize users out of the session.  The
	// typical implementation of this is as simple as supplying the user ID when
	// serializing, and querying the user record by ID from the database when
	// deserializing.
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

	// Initialize Passport and restore authentication state, if any, from the
	// session.
	// passport.session() acts as a middleware to alter the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
	app.use(passport.initialize());
	app.use(passport.session());
};
