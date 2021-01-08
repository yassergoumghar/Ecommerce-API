const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const authController = require('./../controllers/authController');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

//2 Read .env files
dotenv.config({ path: './../config.env' });
const { clientID, clientSecret, callbackURL } = process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // Register user here.
      cb(null, profile);
    }
  )
);

const getCredentials = (req, res, next) => {
  //2 Get user
  const user = req.user._json;

  //2  Put the User data in req.user
  req.user = user;

  //2 Call next
  next();
};

const thirdPartyLogin = catchAsync(async (req, res, next) => {
  const { sub } = req.user;

  // 1) Check if email and password exist
  if (!sub) {
    return next(
      new AppError(
        'Something went wrong ! The login was not successful, Please try agin',
        400
      )
    );
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ googleId: sub });

  if (!user) {
    return next(
      new AppError(
        'Something went wrong ! The login was not successful, Please try agin',
        400
      )
    );
  }

  // 3) If everything ok, send token to client
  authController.createSendToken(user, 200, res);
});

const thirdPartySignUp = catchAsync(async (req, res, next) => {
  const { sub, name, picture, email, locale } = req.user;

  const newUser = await User.create({
    googleId: sub,
    name,
    email,
    picture,
    locale,
  });

  authController.createSendToken(newUser, 201, res);
});

const findOrCreate = catchAsync(async (req, res, next) => {
  //2 Find the user
  const { sub } = req.user;

  const user = await User.findOne({ googleId: sub });

  if (!user) {
    console.log('No user');
    await thirdPartySignUp(req, res, next);
    return;
  }

  console.log('There is user');
  await thirdPartyLogin(req, res, next);
  return;
});

const router = express.Router();

//2 Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  getCredentials,
  findOrCreate
);

module.exports = router;
