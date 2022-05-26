// post is belonging to post schema
const Post = require('../models/post');
const Comment = require('../models/comment');

// Convert in async await
module.exports.create = async function (req, res) {
    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        // Submitted form in AJAX, wiill receive in post controller
        if(req.xhr){ //xml http request
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post  created!"
            })
        }

        req.flash('success', 'Post published');
        return res.redirect('back');

    } catch (err) {
        // console.log("Error", err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// module.exports.create = function(req, res){
//     //creating the post passing in the user
//     Post.create({
//         content : req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }

// convert code into Async await
module.exports.destroy = async function (req, res) {

    try {
        // first find post exist in DB or not
        let post = await Post.findById(req.params.id);
        // checking the post user is matching with same user
        if (post.user == req.user.id) {
            post.remove();
            // deleting the comment associated with
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// module.exports.destroy = function(req, res){
//     // first find post exist in DB or not
//     Post.findById(req.params.id, function(err, post){
//         //.id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({
//                 post: req.params.id
//             }, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


// go to route