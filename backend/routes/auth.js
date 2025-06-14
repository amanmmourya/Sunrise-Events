import express from 'express';
import { login, register, forgotPassword, resetPassword ,findAllUsers , deleteAllUsers , updatePassword, updateUser , logout} from '../controllers/auth.js';
import { validateLogin, validateRegister } from '../middlewares/validators.js';
import { getCurrentUser } from '../controllers/auth.js';
import {authenticateUser,checkAdmin} from '../middlewares/authenticateUser.js';
import { uploadSingle } from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/findAllUsers', findAllUsers);
router.delete('/deleteall', deleteAllUsers);
router.get('/user/me',authenticateUser, getCurrentUser )
router.put('/user-update', authenticateUser , uploadSingle('profilePhoto'),updateUser)
router.put("/change-password", authenticateUser , updatePassword)
router.post("/logout",logout)
router.get('/',checkAdmin,(req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
})

export default router;