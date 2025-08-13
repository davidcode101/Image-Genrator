import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

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
      console.log('Routes available:');
      console.log('- POST /api/image/generate');
      console.log('- POST /api/user/login');
      console.log('- POST /api/user/register');
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
})();