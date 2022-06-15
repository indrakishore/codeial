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

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    console.log("***********INSIDE renderTemplate. DATA: ", data);
    ejs.render(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err){
                console.log('error in rendering template', err);
                return;
            }

            mailHTML = template;
            
        }
    )
    console.log("***********INSIDE renderTemplate. DATA: ", mailHTML);
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}