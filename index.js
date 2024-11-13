const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // This loads variables from .env file

const app = express();
const port = process.env.PORT;

// require express js layout library
const expressLayouts = require('express-ejs-layouts');

// import db (mongoose connection)
const db = require('./config/mongoose');
const mongoose = require('mongoose');  // <-- Ensure mongoose is imported

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const bodyParser = require('body-parser');

// MongoStore
const MongoStore = require('connect-mongo');

// sass-middleware
const sassMiddleware = require('node-sass-middleware');

// require path
const path = require('path');

// require flash library
const flash = require('connect-flash');

// require custom flash middleware
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const options = {
    cors: {
        origin: `http://localhost:${port}`,
        methods: ["GET", "POST"]
    }
};

const chatSockets = require('./config/chat_sockets').chatSockets(chatServer, options);

chatServer.listen(5000, function(){
    console.log(`Chat server is listening on the port: ${port}`);
});

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'assets')));

// Make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// const mongoose = require('mongoose');

// Try to connect to MongoDB using the connection URL
// const mongoose = require('mongoose');
console.log('Mongo URI:', process.env.MONGO_URI);  // This will help you see the value

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});



// console.log('Session Secret:', process.env.SESSION_SECRET);
// console.log('Port:', process.env.PORT);



// MongoStore is used to store the session in the database
app.use(session({
    name: 'codeial',
    secret: process.env.SESSION_SECRET, // Set your secret in the .env file
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100), // in milliseconds
        autoRemove: 'disabled'
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // Directly pass the MongoDB URI from your .env file
        dbName: 'your-db-name',  // Optional: specify your database name if needed
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Set up the current user uses
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running at: http://127.0.0.1:${port}/`);
});
