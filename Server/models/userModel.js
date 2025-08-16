import mongoose from 'mongoose';

// Schema for storing user information
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },                  // User's full name
    email: { type: String, required: true, unique: true },   // User's email (must be unique)
    password: { type: String, required: true },              // Hashed password
    creditBalance: { type: Number, default: 5 },             // User's available credits (default 5)
    verified: { type: Boolean, default: false },             // Whether email is verified
    emailVerificationToken: { type: String }                 // Token for email verification
});

// Reuse existing model if it exists, else create new
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
