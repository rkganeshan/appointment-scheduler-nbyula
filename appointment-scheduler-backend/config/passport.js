const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User=require("../models/user")
const dotenv=require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

const options = {
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
    try {
        // console.log("payload.userId:",payload._id);
        console.log("payload",payload);
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      return done(error, false,{ message: 'Unauthorized!' });
    }
});

module.exports = (passport) => {
    passport.use(strategy);
};
 