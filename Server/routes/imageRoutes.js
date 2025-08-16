import express from 'express';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middleware/auth.js';

const imageRouter = express.Router();

/**
 * POST /api/image/generate
 * Description: Generates an image based on the user's prompt.
 * Protected: Requires a valid token (user must be logged in)
 * Body Parameters:
 *   - prompt (string): The text prompt to generate the image
 * Response:
 *   - success (boolean): true if image generation succeeded
 *   - message (string): success/error message
 *   - resultImage (string): base64 image string (if success)
 *   - creditBalance (number): user's remaining credits
 */
imageRouter.post('/generate', userAuth, generateImage);

export default imageRouter;
