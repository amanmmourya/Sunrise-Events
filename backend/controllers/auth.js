import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utils/error.js';
import crypto from "crypto";
import nodemailer from "nodemailer";
import { randomBytes } from 'crypto';
import bcrypt from "bcryptjs";


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
  },
});

export const deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    next(error); // Pass error to middleware if used
  }
};


export const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "All users fetched successfully", users });
  } catch (error) {
    console.error("Error:", error.message);
    next(error); // Pass error to error-handling middleware (if used)
  }
};



export const login = async (req, res, next) => {
console.log("inside the login backend")  
console.log(req.body);
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found")
      return next(createError(404, 'User not found'));
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log("password is not correct")
      return next(createError(400, 'Invalid credentials'));
    }

    // Generate token

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove password from response
    const { password: pass, ...otherDetails } = user._doc;

    res.status(200).json({
      ...otherDetails,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  console.log("inside the register controller backend")
  console.log(req.body);

  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'User already exists'));
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      name,
    });

    // Save user
    const savedUser = await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove password from response
    const { password: pass, ...otherDetails } = savedUser._doc;

    res.status(201).json({
      ...otherDetails,
      token,
    });
  } catch (err) {
    console.log("in the backend catch error")
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log("In the try function of forgot password");

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, 'User not found'));
    }

          // Generate Reset Token
         const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry

        await user.save();

        // Create Reset URL
        const resetURL = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;
        const frontendURL = 'http://localhost:5173/resetpage'

        // Send Email z xcvb nm,.
        const mailOptions = {
            from: 'harshkamoriya@gmail.com',
            to: user.email,
            subject: "Password Reset Request",
            html:` <p>You requested a password reset</p>
                   <p>Click <a href="${frontendURL}" target="_self">here</a> to reset your password.</p>`,
        };
        console.log(user.email , "user.email");
         console.log(mailOptions, "mailoptions");
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent!",resetURL });

    } catch (error) {
        console.log("Error occurred in forgot password");
        console.error("Forgot Password Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token} = req.query;
    const { newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
  }

  if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
  }

  // Find user with matching token and check expiry
  const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
  });

    if (!user) {
      return next(createError(404, 'User not found'));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    console.log("user password reset succefully")
 
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};