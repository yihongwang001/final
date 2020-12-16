const Strategy = require("passport-local").Strategy;
const myDB = require("../db/usersDB.js");
const passport = require("passport");

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
				if (user.password !== password) {
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
		cb(null, user.username);
	});

	passport.deserializeUser(async function (username, cb) {
		try {
			const user = await myDB.findByUsername(username);
			cb(null, user);
		} catch (err) {
			cb(err);
		}
	});

	app.use(require("body-parser").urlencoded({ extended: true }));
	app.use(
		require("express-session")({
			secret: "yeah I'm original",
			resave: false,
			saveUninitialized: false,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
};
