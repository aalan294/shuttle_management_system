const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    password: { type: String, required: true },  // ✅ Ensure this exists
    totalRideCount: { type: Number, default: 0 },
    rideHistory: { type: Array, default: [] },
    balance: { type: Number, default: 500 },
});

module.exports = mongoose.model('Student', studentSchema);
