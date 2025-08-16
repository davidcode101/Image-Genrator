import userModel from "../models/userModel.js"; // User model for DB operations
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import Razorpay from 'razorpay'; // For payment integration
import transactionModel from "../models/transactionModel.js"; // Transaction model
import nodemailer from 'nodemailer'; // For sending verification emails
import crypto from 'crypto'; // For generating secure random tokens
import 'dotenv/config'; // Load environment variables from .env

// -------------------- Helper: Send Verification Email --------------------
const sendVerificationEmail = async (email, token) => {
  // Create SMTP transporter using Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS
    }
  });

  // Verification link to be clicked by user
  const verifyLink = `http://localhost:4000/api/user/verify-email/${token}`;

  // Send email with verification link
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Verify your email - For INKWAVE ',
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`
  });
};

// -------------------- Register User --------------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields are provided
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Please fill all the fields' });
    }

    const existingUser = await userModel.findOne({ email }); // Check if email exists

    if (existingUser) {
      if (!existingUser.verified) {
        // Resend verification email if unverified
        await sendVerificationEmail(email, existingUser.emailVerificationToken);
        return res.json({ success: true, message: 'Email not verified. Verification email resent.' });
      } else {
        return res.json({ success: false, message: 'Email already registered' });
      }
    }

    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      verified: false,
      emailVerificationToken: verificationToken
    });

    await newUser.save(); // Save to DB
    await sendVerificationEmail(email, verificationToken); // Send verification email

    res.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- Verify Email --------------------
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user by token
    const user = await userModel.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.json({ success: false, message: 'Invalid or expired token' });
    }

    // Mark user as verified
    user.verified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// -------------------- Login User --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (!user.verified) {
      return res.json({ success: false, message: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare password
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Generate JWT
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- Get User Credits --------------------
const userCredits = async (req, res) => {
  try {
    const { userId } = req; // Extract userId from auth middleware
    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name }
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- Razorpay Payment Setup --------------------
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// -------------------- Initiate Payment --------------------
const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userId;

    if (!userId || !planId) {
      return res.json({ success: false, message: 'Missing details' });
    }

    // Set plan details
    let credits, plan, amount;
    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 500;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: 'Plan not found' });
    }

    const date = Date.now();

    // Create transaction record in DB
    const newTransaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date
    });

    // Razorpay order options
    const options = {
      amount: amount * 100, // Razorpay amount in paise
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString()
    };

    const order = await razorpayInstance.orders.create(options); // Create Razorpay order
    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.error?.description || error.message });
  }
};

// -------------------- Verify Razorpay Payment --------------------
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id); // Fetch order details

    if (orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt); // Get transaction
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already processed' });
      }

      const userData = await userModel.findById(transactionData.userId);
      const creditBalance = userData.creditBalance + transactionData.credits;

      // Update user credit and transaction payment status
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

      res.json({ success: true, message: "Credits added" });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// -------------------- Export all controller functions --------------------
export { registerUser, verifyEmail, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
