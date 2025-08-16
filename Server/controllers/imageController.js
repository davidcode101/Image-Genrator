import userModel from "../models/userModel.js"; // Import the Mongoose model for users
import FormData from 'form-data'; // Import FormData to send data to external APIs
import axios from "axios"; // Import axios for HTTP requests

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body; // Get the prompt text from request body
        const userId = req.userId; // Get user ID from request (set in authentication middleware)
        
        const user = await userModel.findById(userId); // Fetch user data from database

        // Check if user exists and prompt is provided
        if (!user || !prompt) {
            return res.json({ success: false, message: 'missing details' });
        }

        // Check if user has enough credits
        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'no credits balance', creditBalance: user.creditBalance });
        }

        // Create FormData to send to the ClipDrop API
        const formData = new FormData();
        formData.append('prompt', prompt); // Add the prompt to FormData

        // Call the ClipDrop API to generate the image
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API, // API key from environment variables
            },
            responseType: 'arraybuffer' // Get raw binary data for image
        });

        // Convert binary data to base64 string
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`; // Format as a base64 image string

        // Deduct 1 credit from user
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        // Return success response with new credit balance and generated image
        res.json({ 
            success: true, 
            message: "image generated", 
            creditBalance: user.creditBalance - 1, 
            resultImage 
        });
    } catch (error) {
        console.log(error.message); // Log any error
        res.json({ success: false, message: error.message }); // Return error response
    }
}
