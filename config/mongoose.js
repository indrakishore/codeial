const mongoose = require('mongoose');

// Suppress deprecation warning for strictQuery
mongoose.set('strictQuery', false);

// Connect with mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});    

const db = mongoose.connection;

// If an error occurs during the connection
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// Once the connection is open, log success message
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// Export the MongoClient from mongoose to be used in the session store
module.exports = {
    client: db.client,  // Access the MongoClient instance
    db: db
};
