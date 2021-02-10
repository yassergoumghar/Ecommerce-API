const express = require('express');
const passport = require('passport');
const authController = require('./../controllers/authController');
const PassportStrategies = require('../controllers/passportStrategies');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//2 Google Strategy Setup
passport.use(PassportStrategies.GoogleMiddleware);

//2 Facebook Strategy Setup
passport.use(PassportStrategies.FacebookMiddleware);

const router = express.Router();

//2 Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.getCredentials,
  authController.findOrCreate
);

//2 Facebook Auth
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  authController.getCredentials,
  authController.findOrCreate
);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/loggedIn', authController.isLoggedIn, (req, res, next) => {
  const { user } = res.locals || undefined;
  const loggedIn = user ? true : false;

  res.status(200).json({
    loggedIn,
  });
});

router.use(authController.protect);

//2 This is a protected route
router.use('/protected', (req, res, next) => {
  res.status(200).json({
    message: 'You are logged in',
  });
});

module.exports = router;
