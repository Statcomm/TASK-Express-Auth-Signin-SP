const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const checkPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (checkPassword) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      done(null, false);
    }
    try {
      const user = await User.findOne({ id: jwtPayload.id });
      if (user) done(null, user);
      else done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
