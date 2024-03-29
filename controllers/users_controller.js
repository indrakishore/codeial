//This can control many users
// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }
const User = require('../models/user'); 
const fs = require('fs');
const path = require('path');

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

module.exports.update = async function(req, res){
    // if current looged in user
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorised');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);//find user then update
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer error:', err)
                }
                // need to store file along user name
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // check if the user avatar already associated with him, then remove that avatar and updated with new one
                    if(user.avatar){
                        //delete the avatar
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    
                    // Error occured due to there is no file link to the user and it stops here
                    //comment --> upload image --> uncomment --> working fine
                    
                    // this is saving the of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                console.log(req.file);
            })

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
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