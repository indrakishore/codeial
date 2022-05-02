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