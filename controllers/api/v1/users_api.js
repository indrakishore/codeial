const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



//sign in and create a session for the user
module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        console.log("-------------------------INSIDE createSession!")
        
        // console.log(user);
        //console.log(req.body.password);

        if (!user || user.password != req.body.password) {
            return res.status(472).json({
                message: "Invalid username or password"
            });
        }

        return res.status(200).json({
            message: "Sign in successful. Here's your token, please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '1000000'})
                // sign is a function which takes the (user_in_json_format, ENCRYPTION_KEY, expiration time)
                // user.toJSON() is the part that gets encrypted
            }
        });
        
    } catch (err) {
        console.log('*************', err);
        return res.json(500, {
            message: "Internal Server Error"
        });

    }
}