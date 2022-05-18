// post is belonging to post schema
const Post = require('../models/post');
module.exports.create = function(req, res){
    //creating the post passing in the user
    Post.create({
        content : req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}

// go to route