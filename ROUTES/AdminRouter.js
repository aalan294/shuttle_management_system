const express = require('express');
const router = express.Router();

router.route('/register')
    .post(require('../CONTROLLERS/AdminController').registerAdmin);
router.route('/login')
    .post(require('../CONTROLLERS/AdminController').loginAdmin)
router.route('/new-bus')
    .post(require('../CONTROLLERS/AdminController').addBus);
router.route('/get-bus')
    .get(require('../CONTROLLERS/AdminController').getAllBuses);

module.exports = router