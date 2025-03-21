const mongoose = require('mongoose');
const RideSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    busId: mongoose.Schema.Types.ObjectId,
    source: String,
    destination: String,
    fare: Number,
    time: String,
});
module.exports = mongoose.model('Ride', RideSchema);