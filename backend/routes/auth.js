import express from 'express';
import { login, register, forgotPassword, resetPassword ,findAllUsers , deleteAllUsers} from '../controllers/auth.js';
import { validateLogin, validateRegister } from '../middlewares/validators.js';
import { getCurrentUser } from '../controllers/auth.js';
import authenticateUser from '../middlewares/authenticateUser.js';
const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/findAllUsers', findAllUsers);
router.delete('/deleteall', deleteAllUsers);
router.get('/user/me',authenticateUser, getCurrentUser )




export default router;