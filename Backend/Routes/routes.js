const express = require('express');
const router = express.Router();
require('dotenv').config();
const authController =require('../Controller/authController');


const cors = require('cors');
router.use(cors());

router.get('/', (req, res) => {
    res.send('Hello from the API! and everything working properly in this');
  });
 

  router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
  });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post('/upload',authController.uploads);
router.delete("/user/:id", authController.deleteUser);

module.exports=router