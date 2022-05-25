// post is belonging to post schema
const Post = require('../models/post');
const Comment = require('../models/comment');

// Convert in async await
module.exports.create = async function (req, res) {
    try {
        
            await Post.create({
                content: req.body.content,
                user: req.user._id
            });

            return res.redirect('back');

    } catch (err) {
        console.log("Error", err);
        return;
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
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error", err);
        return;
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