const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/availability', userController.getSeatAvailability);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/book',  authMiddleware, userController.bookSeat);
router.get('/getAllbookings', authMiddleware, userController.getBookingDetails);


module.exports = router;
