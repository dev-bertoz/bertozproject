const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));


// MongoDB Connection
console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Import model
const User = require('./models/User');

// Test route
app.get('/test-user', async (req, res) => {
  try {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456'
    });
    await user.save();
    res.send('✅ User saved!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error saving user');
  }
});

