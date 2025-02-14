import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import userRouter from "./routes/userRoutes.js"
import flash from "connect-flash"
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";

import connectDB from "./config/db.js";
// import User from './models/user.js';

 
 
import serviceRoutes from "./routes/serviceRoutes.js"
import appointmentRoutes from "./routes/appointment.js"
import agentRoutes from "./routes/agentRoutes.js"
import dashRoutes from "./routes/dashRoutes.js";
import authRoutes from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';


dotenv.config();
connectDB();



const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Middleware to parse JSON request bodies
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); // Optional: To handle form data
// app.use(flash());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // Replace with your frontend's domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware

//Passports
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(session({
//   secret: "yourSecretKey",
//   resave: false,
//   saveUninitialized: true
// }));
 
// Routes
// app.use("/",userRouter)

app.use("/services", serviceRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/agent",agentRoutes)
app.use("/dashboard", dashRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);





// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}).on("error", (err) => {
  console.error(`Error starting server: ${err}`);
});
