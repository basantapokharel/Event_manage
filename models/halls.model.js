const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    image: { type: String },
    available: { type: Boolean, required: true }

    },{timestamps: true,versionKey:false});
    

    module.exports = mongoose.model('halls', hallSchema);