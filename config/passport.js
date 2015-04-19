// config/passport.js

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy
    , GitHubStrategy = require('passport-github').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , TwitterStrategy = require('passport-twitter').Strategy;


var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function(err, user) {
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function(err, user) {
    done(err, user);
  });
});
module.exports = {
    http: {
        customMiddleware: function(app) {
           
		    passport.use(new GitHubStrategy({
		      clientID: "a43d4d25317e2cad7477",
		      clientSecret: "ac7f6de58a393d8846e5b9e8ee76bc11e850488c",
		      callbackURL: "http://localhost:1337/auth/github/callback"
		    }, verifyHandler));

		    passport.use(new FacebookStrategy({
		      clientID: "YOUR_CLIENT_ID",
		      clientSecret: "YOUR_CLIENT_SECRET",
		      callbackURL: "http://localhost:1337/auth/facebook/callback"
		    }, verifyHandler));

		    passport.use(new GoogleStrategy({
		      clientID: 'YOUR_CLIENT_ID',
		      clientSecret: 'YOUR_CLIENT_SECRET',
		      callbackURL: 'http://localhost:1337/auth/google/callback'
		    }, verifyHandler));

		    passport.use(new TwitterStrategy({
		      consumerKey: 'YOUR_CLIENT_ID',
		      consumerSecret: 'YOUR_CLIENT_SECRET',
		      callbackURL: 'http://localhost:1337/auth/twitter/callback'
		    }, verifyHandler));
            console.log('Express middleware for passport');
            app.use( passport.initialize() );
            app.use( passport.session() );
        }
    }
};
module.exports.cache = {

  // The number of seconds to cache files being served from disk
  // (only works in production mode)
  maxAge: 31557600000
};
