// const express = require('express');
// const { path } = require('express/lib/application');
// const app = express();

// const port = 8001;

// //use express router
// app.use('/', require('./routes'))

// //set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views')


// app.listen(port, function(err){
//     if(err){
//         // console.log('Error ', err);
//         // Interpolation
//         console.log(`Error in running the server: ${err}`);
//     }

//     console.log(`Server is running on the port: ${port}`);
// });

// File Structure onwards
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8006;

//require express js layout library
const expressLayouts = require('express-ejs-layouts');

//import db (look into same neighbour)
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret:  'blahsomething',
    // saveUninitialised: false,
    // resave: false,
    saveUninitialized : false,
    resave: false,
    cookie : {
        maxAge : (1000 * 60 * 100) //in milisecond
    }

}));

app.use(passport.initialize());
app.use(passport.session());

//set up the current user uses
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
