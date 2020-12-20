var express = require("express");
var router = express.Router();
var passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login?msg='Error auth'",
  }),
  function (req, res) {
    console.log("Logged in", req.body);
    res.json("logged in");
  }
);

router.get("/getUser", (req, res) =>
  res.send({ username: req.user ? req.user.username : null })
);

router.get("/logout", function (req, res) {
  req.logout();
  console.log("user", req.user);
  res.send("logged out");
});

module.exports = router;
