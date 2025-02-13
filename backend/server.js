import express from "express";
// import connectDB from "./config/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js"
import flash from "connect-flash"

dotenv.config();
// connectDB();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Middleware to parse JSON request bodies
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); // Optional: To handle form data
app.use(flash());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // Replace with your frontend's domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware


 
// Routes
app.use("/",userRouter)

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}).on("error", (err) => {
  console.error(`Error starting server: ${err}`);
});
