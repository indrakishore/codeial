const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// import user
const User = require('../models/user');



//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },

    function(email, password, done){
        //find user and establish the identity
        User.findOne({email:email}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null, false);
            }

            return done(null, user);
        });

    }


));


// serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserialising the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


//check if the user is authinticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}


// if the user is signed in
passport.setAuthenticatedUser = function(req, res, next){
    //req.user contains the current signed in user from the session cookie and we are just sending to the locals for the views
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

//go to route 

module.exports = passport;