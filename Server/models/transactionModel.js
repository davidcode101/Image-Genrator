import mongoose from 'mongoose';

// Schema for storing user transactions
const transactionSchema = new mongoose.Schema({
   userId: { type: String, require: true },       // ID of the user making the transaction
   plan: { type: String, require: true },         // Plan purchased (e.g., Basic, Advanced)
   amount: { type: Number, require: true },       // Amount paid in currency
   credits: { type: Number, require: true },      // Number of credits bought
   payment: { type: Boolean, default: false },    // Whether the payment was completed
   date: { type: Number }                         // Timestamp of the transaction
});

// Reuse existing model if it exists, else create new
const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel;
