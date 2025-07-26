const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/services', require('./routes/serviceRoutes'));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;
