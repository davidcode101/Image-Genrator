import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => res.send('API Working'));

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
})();

/*
API Cheat Sheet:

User Routes:
- POST   /api/user/register       { name, email, password }
- GET    /api/user/verify-email/:token
- POST   /api/user/login          { email, password }
- GET    /api/user/creadits       (Requires token in headers)
- POST   /api/user/pay-razor      { planId } (Requires token)
- POST   /api/user/verify         { razorpay_order_id } (Requires token)

Image Routes:
- POST   /api/image/generate      { prompt } (Requires token)

Example Header for Protected Routes:
{ token: "USER_JWT_TOKEN" }

*/
