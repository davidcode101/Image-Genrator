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

/**
 * POST /api/user/register
 * Description: Registers a new user and sends a verification email.
 * Body Parameters: { name, email, password }
 * Response: { success, message }
 */
userRouter.post('/register', registerUser);

/**
 * GET /api/user/verify-email/:token
 * Description: Verifies user's email via the token sent in email
 * Params: token (string)
 * Response: { success, message }
 */
userRouter.get('/verify-email/:token', verifyEmail);

/**
 * POST /api/user/login
 * Description: Logs in a user
 * Body Parameters: { email, password }
 * Response: { success, token, user }
 */
userRouter.post('/login', loginUser);

/**
 * GET /api/user/creadits
 * Description: Fetches user's remaining credits
 * Protected: Requires valid JWT token
 * Response: { success, credits, user }
 */
userRouter.get('/creadits', userAuth, userCredits);

/**
 * POST /api/user/pay-razor
 * Description: Initiates Razorpay payment for a selected plan
 * Protected: Requires valid JWT token
 * Body Parameters: { planId }
 * Response: { success, order }
 */
userRouter.post('/pay-razor', userAuth, paymentRazorpay);

/**
 * POST /api/user/verify
 * Description: Verifies Razorpay payment and credits user account
 * Body Parameters: { razorpay_order_id }
 * Response: { success, message }
 */
userRouter.post('/verify', verifyRazorpay);

export default userRouter;
