//exports a function which is publically available in route files
//commented bcz something sent directly from the browser
const { populate } = require('../models/post');
const Post = require('../models/post');
 
module.exports.home = function(req, res){
    // return res.end('<h1> Express is up for codeial! </h1>');
    // console.log(req.cookies);
    // cookies going back as response
    // res.cookie('user_id', 25);

    // find all the message
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title : "codeial | Home",
    //         posts : posts,

    //     })
    // });

    // populate the user of each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title : "codeial | Home",
            posts : posts,
        });
    });
};


// module.exports.actionName = function(req, res){
    
// }