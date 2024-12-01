const mongoose=require('mongoose')
 
const bookingModel = require("../models/bookings.model")
const data=require("./bookings.js")

const db_config=require("../configs/db.config")


//connection with mongodb
main()
.then(()=>{
    console.log("Connected to Database")

}).catch((err)=>{
    console.log(err);
})

const initDB = async () => {
    try {
        await bookingModel.deleteMany({}); // Clear existing records
        await bookingModel.insertMany(data.bookings); // Insert halls data
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};

async function main(){
    await mongoose.connect(db_config.DB_URL)
}

initDB();