import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js"
import appointmentRoutes from "./routes/appointment.js"
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // Replace with your frontend's domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/services", serviceRoutes);
app.use("/appointment", appointmentRoutes);


// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}).on("error", (err) => {
  console.error(`Error starting server: ${err}`);
});
