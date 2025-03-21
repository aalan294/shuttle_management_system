const mongoose = require('mongoose');
const StopSchema = new mongoose.Schema({
    name: String,
    timeFromCollege: String,
    timeToCollege: String,
    fare: Number,
});
module.exports = mongoose.model('Stop', StopSchema);