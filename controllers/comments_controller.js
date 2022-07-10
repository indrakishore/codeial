const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const { populate } = require('../models/comment');
// Add : import like model
const Like = require('../models/like');

const User = require('../models/user');



// async await
module.exports.create = async function (req, res) {
    // create comment over the post (can be fiddle with website)
    // post found, comment found, 
    try {   
        let post = await Post.findById(req.body.post);
        // if post found

        // console.log("************ Inside create - comments controller. Post: ", post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            // console.log("************ Inside if(post) - comments controller. Comment: ", comment);
            
            //comment = await comment.populate('user', 'name email').execPopulate();
            comment = await comment.populate({
                path: 'user',
                model: 'User',
                select: 'name email'                
            });

            // console.log("************ Inside if(post) - comments controller. Comment: ", comment);

            commentsMailer.newComment(comment);
            
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);
            });

            // console.log("************ Inside if(post) - comments controller. AFTER COMMENTS MAILER ");

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            // console.log("************ Inside if(post) - comments controller. AFTER REQ.XHR ");

            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}
//             post.save();

//             res.redirect('/');
//         };
//     } catch (err) {

//         console.log("Error", err);
//         return;
//     }
// }

// module.exports.create = function(req, res){
//     // create comment over the post (can be fiddle with website)
//     Post.findById(req.body.post, function(err, post){
//         // if post found
//         if(post){
//             Comment.create({
//                 content : req.body.content,
//                 post : req.body.post,
//                 user : req.user._id
//             }, function(err, comment){
//                 //handle error

//                 if(err){
//                     console.log("Error in creating comment");
//                     return;
//                 }

//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             });
//         }
//     })
// }

// Async await
// module.exports.destroy = async function (req, res) {
//     try {
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id) {
//             let postId = comment.post;
//             comment.remove();

//             //update the post
//             // pull out the comment id from the list of comments
//             let post = await Post.findByIdAndUpdate(postId, {$pull: 
//                 { comments: req.params.id}});
//                 return res.redirect('back');
//         } else {
//             return res.redirect('back');
//         }
//     }catch(err){
//         console.log('Error', err);
//         return;
//     }
// }

// CHANGE : FRIEND + LIKES
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


//delete a comment
// module.exports.destroy = function (req, res) {
//     Comment.findById(req.params.id, function (err, comment) {
//         if (comment.user == req.user.id) {
//             let postId = comment.post;
//             comment.remove();

//             //update the post
//             // pull out the comment id from the list of comments
//             Post.findByIdAndUpdate(postId, {
//                 $pull: {
//                     comments: req.params.id
//                 }
//             }, function (err, post) {
//                 return res.redirect('back');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     });
// }