const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
// const authController = require('./../controllers/authController');

//! TEMPORARLY
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

//2 Read .env files
dotenv.config({ path: './../config.env' });
const { clientID, clientSecret, callbackURL } = process.env;

//4 Google Strategy

const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      passReqToCallBack: true,
      clientID,
      clientSecret,
      callbackURL,
    },
    catchAsync(async (request, accessToken, refreshToken, profile, done) => {
      const { sub, name, picture, email, locale } = profile._json;
      let user = await User.findOne({ email });

      //2 Check if the user has already signed up, if not create him
      if (!user) {
        user = await User.create({
          name,
          googleId: sub,
          email,
          picture,
          locale,
        });
      }

      done(null, user);
    })
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(
  catchAsync(async (id, done) => {
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
  })
);

const router = express.Router();

router.use(passport.initialize());

//2 Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/redirect',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    console.log(req.user);
    res.send('This is redirect URL');
  }
);

module.exports = router;
