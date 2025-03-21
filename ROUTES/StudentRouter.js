const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../CONTROLLERS/StudentController').loginStudent);
router.route('/register')
    .post(require('../CONTROLLERS/StudentController').registerStudent);
router.route('/book-ride')
    .post(require('../CONTROLLERS/StudentController').bookRide)
    .get(require('../CONTROLLERS/StudentController').getAllStudents)

module.exports = router
