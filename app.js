
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

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));  // For form data (application/x-www-form-urlencoded)
app.use(express.json());  // For JSON data (application/json)


//method-override
app.use(require("method-override")("_method"))





//connection with mongodb
main()
.then(()=>{
    console.log("Connected to Database")

}).catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(db_config.DB_URL)
}




//stiching homeroute
require("./routes/login.routes")(app)
require("./routes/admin.routes")(app)

//connection with server
app.listen(server_config.PORT,()=>{
    console.log("Server is listening to the port ",server_config.PORT)
})