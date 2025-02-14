import { createError } from '../utils/error.js';

export const validateLogin = (req, res, next) => {
  console.log("inside the login validator")
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("email password required")
    return next(createError(400, 'Email and password are required'));
  }

  if (!isValidEmail(email)) {
    console.log("email not valid")
    return next(createError(400, 'Invalid email format'));
  }

  next();
};

export const validateRegister = (req, res, next) => {
  console.log("in the validate register function");
  console.log("req body", req.body);
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    console.log("all fields are required")
    return next(createError(400, 'All fields are required'));
  }

  if (!isValidEmail(email)) {
    console.log("invalid email format")
    return next(createError(400, 'Invalid email format'));
  }

  if (password.length < 6) {
    console.log("password is not strong")

    return next(createError(400, 'Password must be at least 6 characters long'));
  }

  next();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};