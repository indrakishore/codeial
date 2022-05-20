// post is belonging to post schema
const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = function(req, res){
    // first find post exist in DB or not
    Post.findById(req.params.id, function(err, post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({
                post: req.params.id
            }, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}


// go to route