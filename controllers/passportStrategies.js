const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');

//2 Read .env files
dotenv.config({ path: './../config.env' });
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
} = process.env;

exports.GoogleMiddleware = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, cb) {
    // Register user here.
    cb(null, profile);
  }
);

exports.FacebookMiddleware = new FacebookStrategy(
  {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: [
      'id',
      'email',
      'gender',
      'link',
      'locale',
      'name',
      'timezone',
      'updated_time',
      'verified',
    ],
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
);
