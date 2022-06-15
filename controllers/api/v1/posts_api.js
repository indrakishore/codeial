const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

// const { post } = require('../../../routes/api/v1');
// controller action
module.exports.index = async function(req, res){
    
    let posts = await Post.find({})
        // sort the post in reverse-chronological order
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{          //populate further
                path: 'user'
            }
        });
    
    // return res.json(200, { warning: express deprecated res.json(status, obj): Use res.status(status).json(obj) instead

    return res.status(200).json({
        message: "List of posts",
        // posts: []
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {

    try {
        // first find post exist in DB or not
        let post = await Post.findById(req.params.id);
        // checking the post user is matching with same user
        if (post.user == req.user.id) {
            post.remove();
            // deleting the comment associated with
            await Comment.deleteMany({ post: req.params.id });

            // req.flash('success', 'Post and associated comments deleted');
            // return res.json(200,{
            //     message: "Post and associated comments deleted successfully!"

            // });

            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return es.status(200).json({
                message: "You can't delete this post.,mnbgvcfd  sdert!"
            });
        }
        // } else {
        //     req.flash('error', 'You cannot delete this post');
        //     return res.redirect('back');
        // }
    } catch (err) {
        // console.log("*************", err);
        // return res.json(500,{
        //     message: "Internal Server Error"
        // });
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}