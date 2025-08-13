import userAuth from '../middleware/auth.js';
import {registerUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/creadits', userAuth ,userCredits);
userRouter.post('/pay-razor', userAuth ,paymentRazorpay);
userRouter.post('/verify', verifyRazorpay);
export default userRouter;
//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login

