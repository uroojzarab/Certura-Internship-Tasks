import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";

import authRoutes from "./src/routes/user_route.js";
import taskRoutes from "./src/routes/task_routes.js";
import fileRoutes from "./src/routes/fileroutes.js";
import path from "path";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
// Middleware
app.use(express.json()); // Parse JSON requests
//Serve Static Files (For retrieving files via URL)
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/file", fileRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
