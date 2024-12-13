
//express
const express = require("express")
const app = express()
const path = require('path');

//mongodb
const mongoose = require("mongoose")


//configs
const server_config=require("./configs/server.config")
const db_config=require("./configs/db.config")


// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set the path for views folder (Express defaults to './views')
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));  // For form data (application/x-www-form-urlencoded)
app.use(express.json());  // For JSON data (application/json)




//method-override
app.use(require("method-override")("_method"))

const session = require('express-session');

//session
// Express session middleware
app.use(session({
    secret: 'yourSecretKey',  // Secret key for encrypting session data
    resave: false,            // Don't save session if unmodified
    saveUninitialized: true,  // Save a session even if it hasn't been modified
}));

//firebase
const db=require("./configs/firebase.config");







//stiching homeroute
require("./routes/login.routes")(app)
require("./routes/admin.routes")(app)
require("./routes/booking.routes")(app)

//connection with server
app.listen(server_config.PORT,()=>{
    console.log("Server is listening to the port ",server_config.PORT)
})