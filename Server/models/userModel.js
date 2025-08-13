import mongoose from 'mongoose';

// userModel.js
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 },
    verified: { type: Boolean, default: false },
    emailVerificationToken: { type: String }
});

const userModel = mongoose.models.user  ||  mongoose.model("user", userSchema);
export default userModel;