const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');


const app = express();
dotenv.config();
const port = process.env.PORT;

//require express js layout library
const expressLayouts = require('express-ejs-layouts');

//import db (look into same neighbour)
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const bodyParser = require('body-parser');

// MongoStore
const MongoStore = require('connect-mongo');

//sass-middleware
const sassMiddleware = require('node-sass-middleware');

// require path
const path = require('path');

//reuire flash library
const flash = require('connect-flash');

//require customfalsh middleware
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
// const chatServer = require('http').Server(app);

// Add new lines for current versions
const chatServer = require('http').createServer(app);
const options = {
    cors: {
        origin: `http://localhost:${port}`,
        methods: ["GET", "POST"]
    }
}

const chatSockets = require('./config/chat_sockets').chatSockets(chatServer, options);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000, function(){
    console.log(`chat server is listening on the port: ${port}`);
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

// app.use(express.static('./assets'));
app.use(express.static(path.join(__dirname, 'assets')));

// Make the uploads path available to the browser
// app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(expressLayouts);


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store the cookie
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100), //in milisecond
        autoRemove: 'disabled'
    },
    // add new key
    // store : new MongoStore ({
    //     mongooseConnection : db,`
    //     autoRemove : 'disabled'
    // },
    // function(err){
    //     console.log(err || 'connect-mongodb setup ok');
    // }
    // )
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://indra:indrakk@cluster0.cwwcbst.mongodb.net/?retryWrites=true&w=majority'
    })

}));

app.use(passport.initialize());
app.use(passport.session());

//set up the current user uses
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running at: http://127.0.0.1:${port}/`);
});