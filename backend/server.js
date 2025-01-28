const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

dotenv.config(); // Load environment variables
connectDB(); // Initialize database connection

const app = express();
app.use(express.json()); // Parse JSON payloads

// Example middleware
app.use(require("cors")());
app.use("/api", routes); // Use centralized routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
