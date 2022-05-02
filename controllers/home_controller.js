//exports a function which is publically available in route files
module.exports.home = function(req, res){
    return res.end('<h1> Express is up for codeial! </h1>');
}

module.exports.actionName = function(req, res){
    
}