import express from 'express';
import passport from 'passport';
import User from '../models/user.js';
import saveUrl  from '../middlewares/login.js';
import * as userController from '../controllers/userController.js'; // Import all controller functions

const router = express.Router();

router
  .route('/signup')
//   .get(userController.renderSignupForm)
  .post(userController.signup);

// router
//   .route('/login')
//   .get(userController.renderLoginForm)
//   .post(
//     saveUrl,
//     passport.authenticate('local', {
//       failureRedirect: '/login',
//       failureFlash: true,
//     }),
//     userController.login
//   );

// router.get('/logout', userController.logout);

export default router;
