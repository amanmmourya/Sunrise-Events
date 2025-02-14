import express from 'express';
import { login, register, forgotPassword, resetPassword ,findAllUsers , deleteAllUsers} from '../controllers/auth.js';
import { validateLogin, validateRegister } from '../middlewares/validators.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/findAllUsers', findAllUsers);
router.delete('/deleteall', deleteAllUsers);



export default router;