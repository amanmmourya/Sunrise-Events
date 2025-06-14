import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { createError } from '../utils/error.js';
import crypto from "crypto";
import nodemailer from "nodemailer";
import { randomBytes } from 'crypto';
import bcrypt from "bcryptjs";
import blacklistedTokens from '../models/blacklistedTokens.js';



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
  console.log("Inside the login backend");  
  console.log("Cookies",req.cookies.ACCESS_TOKEN);
  console.log(req.body);

  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return next(createError(404, 'User not found'));
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log("Password is not correct");
      return next(createError(400, 'Invalid credentials'));
    }

    // Determine user role
    let role = user.role || "user"; // Default to "user"
    const adminEmails = ["mouryaaman69@gmail.com"]; // Replace with actual admin emails
    if (adminEmails.includes(email)) {
      role = "admin";
    }
    console.log("user role ", role);



    // Generate token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const token_ = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log("Token generated at login:", token);
    // Remove password from response
    const { password: pass, ...otherDetails } = user._doc;

    res.status(200).cookie("ACCESS_TOKEN",token_,{httpOnly:true,secure:true}).json({
      ...otherDetails,
      role,
      token,
    });
  } catch (err) {
    next(err);
  }
};


export const register = async (req, res,next) => {

  console.log("Inside the register controller backend");
  console.log("Request body:", req.body);
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password, name });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: pass, ...otherDetails } = savedUser._doc;

    return res.status(201).cookie("ACCESS_TOKEN",token,{httpOnly:true,secure:true}).json({
      ...otherDetails,
      token,
    });

  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
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
    console.log(req.body, "body of reset password");

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

 export const getCurrentUser = async (req, res) => {
  const {id} = req.user;
  const userId = id;
  console.log(req.user);
  console.log(id, "user id");
  // Extract user ID from the token payload
  console.log("User ID from token:", userId);

  try {
      // Fetch the user from the database
      const currentUser = await User.findById(userId).select('name email role profilePhoto , phone , createdAt'); // Exclude sensitive fields

      if (!currentUser) {
          console.log("User not found");
          return res.status(404).json({ message: 'User not found' });
      }
// Determine user role
console.log(currentUser,"current user")
let role = currentUser.role || "user"; // Default to "user"
const adminEmails = ["harshkamoriya@gmail.com"]; // Replace with actual admin emails
if (adminEmails.includes(currentUser.email)) {
  currentUser.role = "admin";
}
console.log("user role ", currentUser.role);

      // Send the user details
      res.status(200).json({
          message: 'Current user info fetched successfully',
          user: currentUser,
      });
  } catch (error) {
      console.error("Error fetching the current user:", error);
      res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body); // To check the body data

  const { name, email } = req.body; // Extract name and email from body
  const { id } = req.user; // Extract userId from the authenticated user
  const userId = id;
  const profilePhoto = req.file ? req.file.path : null; // Check if file exists and get the file path

  console.log("User ID from authenticate user is:", userId);

  try {
      // Prepare the data to update
      console.log("In the update try block");

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (profilePhoto) updateData.profilePhoto = profilePhoto; // Update profile photo if available

      // Update the user in the database
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: updateData }, // Correct operator to set new data
          { new: true } // Return the updated document
      );

      // Check if the user was found and updated
      if (!updatedUser) {
          console.log("User not found");
          return res.status(404).json({ message: 'User not found' });
      }

      // Respond with success
      res.status(200).json({ 
          message: 'Profile updated successfully', 
          user: updatedUser 
      });
      console.log("Profile updated successfully");
  } catch (error) {
      // Handle errors
      res.status(500).json({ 
          message: 'Error updating profile', 
          error: error.message 
      });
  }
};

const updatePassword = async (req, res) =>{
  const { currentPassword, newPassword } = req.body;
console.log(req.body);
  try {
      const {id} = req.user;
       const userId = id;
      console.log("current user id is:",userId);
    // Access user ID from `req.user` set by `authenticateUser` middleware
    const user = await User.findById(userId);
    console.log("user is found ", user);
    console.log("user password (hashed", user.password)


    if (!user) {
      
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log("password mismatch result ", isMatch)
    if (!isMatch) {
      console.log("current passwrod is incorrect");

      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password: in controller", error.message);
    res.status(500).json({ message: "Server error" });
  }

}

 const logout =async ( req , res)=>{
  console.log("request body in the logout function" , req.body) ;
  const token = req.header('Authorization')?.replace('Bearer','');
  console.log(token);
  if(token){
      blacklistedTokens.add(token);
      return res.status(200).json({message :'Logged out successfully'});
  }
  res.status(400).json({error : 'token not provided'});

}



export { updatePassword, updateUser , logout};