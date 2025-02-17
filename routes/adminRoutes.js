const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const authController= require('../controllers/authControllers');


router.post('/register', authController.registerAdmin);
router.post('/login', authController.loginAdmin);
router.post('/logout', authController.logoutAdmin);
router.post('/addTrain', apiKeyMiddleware.authenticateAdmin, adminController.addTrain);
router.put('/update-seats/:trainId', apiKeyMiddleware.authenticateAdmin, adminController.updateTrainSeats);

module.exports = router;
