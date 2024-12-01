const mongoose=require('mongoose')
 
const hallModel = require("../models/halls.model")
const data=require("./halls.js")

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
        await hallModel.deleteMany({}); // Clear existing records
        await hallModel.insertMany(data.halls); // Insert halls data
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};

async function main(){
    await mongoose.connect(db_config.DB_URL)
}

initDB();