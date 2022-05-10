//This can control many users
// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
const { use } = require('express/lib/application');
const { redirect } = require('express/lib/response');
const User = require('../models/user'); 

module.exports.profile = function(req, res){
    //check in cookies if user id is present
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile',{
                    title: "user profile",
                    user: user
                })
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign_in');
    }

    // return res.end('<h1> Express is up for codeial! </h1>');
    // return res.render('user_profile', {
    //     title : "User profile"
    // });
}

// Actions

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req, res){
    //TO DO LATER
    //If password is not matches
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        // if user not found
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');

            });
        }else{
            return res.redirect('back');
        }
    });
    



}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    // Steps to authentication
    // 1. Find the user
    User.findOne({email : req.body.email},function(err, user){
        if(err){
            console.log('error in creating user while signing up');
            return;
        }

        //2.handle user found
        if(user){
            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }

    })
}