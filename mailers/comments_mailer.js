const nodemailer = require('../config/nodemailer');

// // newComment = function

// // module.exports = newComment
// //create a fuhnction which sends mail

// // this is another way of exporting a method
exports.newComment = (comment) => {
    console.log("Hello");
    // console.log('inside newComment mailer');
    console.log('inside newComment mailer', comment);
    // template
    nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs', function (data) {
        nodemailer.transporter.sendMail({
            from: "indrakishore.mca19.du@gmail.com",
            to: comment.user.email,
            subject: "New Comment Published!",
            // html: "Your comment got published!",
            html: data,
            // yet to add htmlString over here 
        }, (err, info) => {
            if(err){
                console.log('Error in sending mail', err);
                return;
            }
    
            // console.log("Meassage sent", info);
            return;
        });
    });

    // nodemailer.transporter.sendMail({
    //     from: "indrakishore.mca19.du@gmail.com",
    //     to: comment.user.email,
    //     subject: "New Comment Published!",
    //     // html: "Your comment got published!",
    //     html: htmlString + '<h2>Hi  Guys!</h2>',
    //     // yet to add htmlString over here 
    // }, (err, info) => {
    //     if(err){
    //         console.log('Error in sending mail', err);
    //         return;
    //     }

    //     console.log("Meassage sent", info);
    //     return;
    // });
}

