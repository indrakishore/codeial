const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'indrakishore.mca19.du@gmail.com', //change later
        pass: 'nupzhfpmxdaebrwu'//write valid pwd
    }
});

let renderTemplate = (data, relativePath, callback) => {
    // let mailHTML;
    console.log("***********INSIDE renderTemplate. DATA: ", data);
    let pp = path.join(__dirname, '../views/mailers', relativePath);
    console.log('path' + pp);
    ejs.renderFile(
        pp,
        data,
        function(err, template) {
            if(err){
                console.log('error in rendering template', err);
                return;
            }
            console.log("here" + template);
            return callback(template);
        }
    )
    // console.log("***********INSIDE renderTemplate. mailDATA: ", mailHTML);
    // return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}