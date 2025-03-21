const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['in', 'out'], required: true }, // "in" = To College, "out" = From College
    seatsAvailable: { type: Number, required: true },
    route: [
        {
            stop: { type: String, required: true }, // Stop Name
            time: { type: Number, required: true }, // Travel Time from the Previous Stop (in minutes)
            fare: { type: Number, required: true } // Fare from the Previous Stop
        }
    ],
});

module.exports = mongoose.model('Bus', BusSchema);
