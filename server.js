// server.js

// Import required modules
// require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
// const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userRoutes = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON requests

connectDB();

app.use(express.json());

// Route for the root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Algorithm Visualizer API");
});


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow credentials (e.g., cookies, authorization headers)
  })
);

app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// // Registration endpoint
// app.post("/api/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login endpoint
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// // Protected route
// app.get("/api/user", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
