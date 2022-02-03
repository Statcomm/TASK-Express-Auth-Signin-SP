const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (newUser) => {
  const payload = {
    id: newUser._id,
    username: newUser.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  return jwt.sign(JSON.stringify(payload), JWT_SECRET);
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, done) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};
