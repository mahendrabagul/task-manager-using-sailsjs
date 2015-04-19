  // api/controllers/AuthController.js

var passport = require('passport');

module.exports = {
    
    login: function(req, res) {
        res.view();
    },
    process: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if((err)||(!user)) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            if(user.isverified) {
              req.session.user=user;
              req.logIn(user, function(err) {
                if(err) res.send(err);
                  res.redirect('/task');
                  // return res.send({message:'login successful'});
              });
            } else {
              res.send("Your accout is not yet verified");
            }
        }) (req, res);
    },
    logout: function(req, res) {
        req.logOut();
        // res.send({message:'logout successful'});
        res.redirect('/login');

    },
      // http://developer.github.com/v3/
      // http://developer.github.com/v3/oauth/#scopes
      github: function(req, res) {
        passport.authenticate('github', { failureRedirect: '/login' }, function(err, user) {
          req.logIn(user, function(err) {
            if (err) {
              console.log(err);
              res.view('500');
              return;
            }

            res.redirect('/');
            return;
          });
        })(req, res);
      },

      // https://developers.facebook.com/docs/
      // https://developers.facebook.com/docs/reference/login/
      facebook: function(req, res) {
        passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
          req.logIn(user, function(err) {
            if (err) {
              console.log(err);
              res.view('500');
              return;
            }

            res.redirect('/');
            return;
          });
        })(req, res);
      },

      // https://developers.google.com/
      // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
      google: function(req, res) {
        passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }, function(err, user) {
          req.logIn(user, function(err) {
            if (err) {
              console.log(err);
              res.view('500');
              return;
            }

            res.redirect('/');
            return;
          });
        })(req, res);
      },

      // https://apps.twitter.com/
      // https://apps.twitter.com/app/new
      twitter: function(req, res) {
        passport.authenticate('twitter', { failureRedirect: '/login' }, function(err, user) {
          req.logIn(user, function(err) {
            if (err) {
              console.log(err);
              res.view('500');
              return;
            }

            res.redirect('/');
            return;
          });
        })(req, res);
      }
};

module.exports.blueprints = {
    actions: true,
    rest: true,
    shortcuts: true
};