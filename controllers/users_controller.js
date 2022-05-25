//This can control many users
// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
const User = require('../models/user'); 
// let's keep it same as before bcause there is no nexting level just one call back available here.
module.exports.profile = function(req, res){
    // return res.end('<h1> Express is up for codeial! </h1>');
    User.findById(req.params.id, function(err, user){
        // send user to frontend
        return res.render('user_profile', {
            title : "User Profile",
            profile_user : user
        });
    });
    
}

module.exports.update = function(req, res){
    // if current looged in user
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorised');
    }
}

// Actions

// render the sign up page
module.exports.signUp = function(req, res){
    //restirct sign up page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        // console.log("Authenticated successfully");
       return res.redirect('/users/profile');
    }

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
    req.flash('success', 'logged in Successfully');
   return res.redirect('/'); 
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have looged out!'); //this message needs to transform in response
    return res.redirect('/');
}