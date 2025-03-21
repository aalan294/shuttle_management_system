const mongoose = require('mongoose.js');

const DriverSchema = new mongoose.Schema({
    mobile: String,
    password: String,
    busNumber: String,
    location: String,
    isFull: Boolean,
    totalSeats: Number,
    readyToRide: Boolean,
});
module.exports = mongoose.model('Driver', DriverSchema);