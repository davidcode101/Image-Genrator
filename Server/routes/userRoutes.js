
import express from 'express';
import userAuth from '../middleware/auth.js';
import { 
    registerUser,
    verifyEmail,
    loginUser,
    userCredits,
    paymentRazorpay,
    verifyRazorpay
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/verify-email/:token', verifyEmail);
userRouter.post('/login', loginUser);
userRouter.get('/creadits', userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify', verifyRazorpay);

export default userRouter;
