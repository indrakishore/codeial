// First install mongoose (npm install mongoose)
const mongoose = require('mongoose');

// connect with mongodb
mongoose.connect('mongodb://localhost/codeial_development');    

const db = mongoose.connection;

//if error occured
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//if connection is open
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

//made module usable (place in idex.js.. require)
module.exports = db;