const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer'); 
const User = require('../models/userModel');
const OTPs = {}; 


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD, 
    },
});

const generateOTP = async (email) => {
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    OTPs[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

   
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your OTP Code For Login',
            text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
        });
        console.log('OTP sent to:', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }

    return otp;
};

const verifyOTP = (email, otp) => {
    if (!OTPs[email] || OTPs[email].expiresAt < Date.now()) return false;
    return OTPs[email].otp === otp;
};

const registerUser = async (userData) => {
    return await User.create(userData);
};

const authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    return user;
};
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });

        return user; 
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id,name: user.name, email: user.email, companyName: user.companyName, age: user.age, dob: user.dob, image: user.image}, 'secretKey', { expiresIn: '1h' });
};

const forgotPassword = async (email) => {
    // Validate email format
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        throw new Error("Invalid email address");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    try {
        const otp = await generateOTP(email);
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        return { message: "OTP sent to your email" };
    } catch (error) {
        throw new Error("Error generating or sending OTP. Please try again.");
    }
};

const resetPassword = async (email, newPassword, otp) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        throw new Error("Invalid or expired OTP");
    }

    const match = await bcrypt.compare(newPassword, user.password);
    if (match) {
        throw new Error("New password cannot be the same as the old password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return { message: "Password updated successfully" };
};
const deleteUserById = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { success: false, message: "User not found" };
      }
      
      await user.destroy();
      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

module.exports = { registerUser, authenticateUser, generateOTP, verifyOTP, getUserByEmail, generateToken, forgotPassword, resetPassword,deleteUserById };
