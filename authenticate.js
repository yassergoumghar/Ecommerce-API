var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "576897995216-i0bppgq718gqh9bmujkm6m0paf7husma.apps.googleusercontent.com",
      clientSecret: "Ag5jYjIipsPNkzM6RbOyfpvv",
      callbackURL: "/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // Register user here.
      cb(null, profile);
    }
  )
);
