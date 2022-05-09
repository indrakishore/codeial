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
const app = express();
const port = 8000;

//require express js layout library
const expressLayouts = require('express-ejs-layouts');

//import db (look into same neighbour)
const db = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
