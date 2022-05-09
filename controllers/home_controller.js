//exports a function which is publically available in route files
//commented bcz something sent directly from the browser

 
module.exports.home = function(req, res){
    // return res.end('<h1> Express is up for codeial! </h1>');
    console.log(req.cookies);
    // cookies going back as response
    res.cookie('user_id', 25);
    return res.render('home', {
        title : "Home"
    });
}

// module.exports.actionName = function(req, res){
    
// }