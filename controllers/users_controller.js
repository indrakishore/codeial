//This can control many users
// module.exports.profile = function(req, res){
//     res.end('<h1>User Profile</h1>');
// }

module.exports.profile = function(req, res){
    // return res.end('<h1> Express is up for codeial! </h1>');
    return res.render('profile', {
        title : "profile"
    });
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