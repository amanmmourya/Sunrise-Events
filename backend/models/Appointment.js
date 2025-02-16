import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue:{type:String , required:true},
  guests:{type:String , required:true},
  eventType: { type: String, required: true },
  specialRequests: { type: String, required: true },
  service :{ type : String },
  price:{type: Number},
  status: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
  razorpayOrderId:String,
  razorpayPaymentId:String,
  paymentStatus :{
    type:String,
    enum :['pending', 'confirmed'],
    default :'pending'
  }
});

// Middleware to format the date before saving
AppointmentSchema.pre("save", function (next) {
  if (this.date && typeof this.date === "string") {
    this.date = new Date(this.date); // Convert to Date object if it's a string
  }
  next();
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
