const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    info: { type: String, required: true },
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'halls' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['booked', 'pending', 'cancelled'], default: 'pending' }

},{timestamps: true,versionKey: false});

module.exports = mongoose.model('bookings', bookingSchema);