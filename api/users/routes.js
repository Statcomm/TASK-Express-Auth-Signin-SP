const express = require("express");
const router = express.Router();
const { signup, signIn } = require("./controllers");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
