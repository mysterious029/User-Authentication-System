const authService = require('../Services/authService');
const upload = require('multer')({dest: "uploads/"});
const User = require('../Models/userModel');


const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // Authenticate user
    const user = await authService.authenticateUser(email, password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate OTP
    try {
        const otp = await authService.generateOTP(email);
        res.json({ message: "OTP sent to your email", otp });
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP. Please try again." });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const isOtpValid = authService.verifyOTP(email, otp);
        if (!isOtpValid) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const user = await authService.getUserByEmail(email); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = authService.generateToken(user);

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const response = await authService.forgotPassword(email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const resetPassword = async (req, res) => {
    try {
      const { email, newPassword, otp } = req.body;
      const response = await authService.resetPassword(email, newPassword, otp);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const uploads =  async (req, res) => {
    try {
      upload.single("image")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded." });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.json({ message: "Image uploaded successfully", imageUrl: imageUrl });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await authService.deleteUserById(id);

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { register, login, verifyOtp, forgotPassword, resetPassword , uploads, deleteUser};