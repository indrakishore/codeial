const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: "372598084186-o2rglhga1i3h6so9ge96pusgrqg30l4n.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `http://localhost:${process.env.PORT}/users/auth/google/callback`,
},

    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in google strategy-passport', err); 
                return;
            }
            console.log(accessToken, refreshToken);
            console.log("profile: ", profile);
            console.log("user: ", user);
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                console.log("creating user");
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(256)
                }, function (err, user) {
                    if (err) {
                        console.log('error in creating user', err); 
                        return;
                    }
                    console.log("i'm reaching to done.")
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;
