//exports a function which is publically available in route files
//commented bcz something sent directly from the browser
// const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

// optimise using async await
// finding the post and executing the query then in the callback finding the user and inside the callback users will find
// then returning to the browser the list of all users and posts along with title
module.exports.home = async function(req, res){

    //handle error using try catch
    try{
        // CHANGE: populate the likes of each post and comment
        let posts = await Post.find({})
        // sort the post in reverse-chronological order
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{          //populate further
                path: 'user'
            },
            // Add
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        // once this post part gets executed then this users part get exexuted
        let users = await User.find({});
        //then return something to the browser
        return res.render('home', {
            title: "Codeial | home",
            posts: posts,
            all_users : users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
};
 
// module.exports.home = function(req, res){
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
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate:{          //populate further
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     User.find({}, function(err, users){
    //         return res.render('home', {
    //             title : "codeial | Home",
    //             posts : posts,
    //             all_users: users
    //         });
    //     });
       
    // });
// };


// Post.find({})
//       .populate([{
//           path: 'user',
//         //   model: 'User'
//       }, {
//         path: 'comments',
//         // model: 'Comment',
//         populate: {
//             path: 'user',
//             // model: 'User'
//         }
//       }])
//       .exec(function(err, posts){
//         return res.render('home', {
//             title: "Codeial | home",
//             posts: posts
//         });
//     });
// };

// module.exports.actionName = function(req, res){}