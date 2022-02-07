const express = require("express");
const router = express.Router();
const { signup, signIn } = require("./controllers");
const passport = require("passport");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
