import Appointment from "../models/Appointment.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";
// import Service from "../model

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay Key Secret
});

const bookSlots = async (req, res) => {
  console.log("in the bookslots backend ");
  console.log(req.body);
  const {
    name,
    email,
    phone,
    date,
    time,
    venue,
    guests,
    specialRequests,
    eventType,
    price,
  } = req.body;

  // Input validation

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }
  if (!phone) {
    return res.status(400).json({ error: "phone is required" });
  }
  if (!date) {
    return res.status(400).json({ error: "date is required" });
  }
  if (!time) {
    return res.status(400).json({ error: "time is important" });
  }

  if (!venue) {
    return res.status(400).json({ error: "venue is required" });
  }
  if (!guests) {
    return res.status(400).json({ error: "guests is required" });
  }
  if (!specialRequests) {
    return res.status(400).json({ error: "specialRequest  is required" });
  }
  if (!eventType) {
    return res.status(400).json({ error: "eventype is required" });
  }
  if (!price) {
    return res.status(400).json({ error: "price name is required" });
  }

  try {
    console.log("in the try function");
    // Check if the time slot is already booked
    const existingAppointment = await Appointment.findOne({
      time,
      date,
      status: "confirmed",
    });
    if (existingAppointment) {
      console.log("appointment already exist");
      return res
        .status(400)
        .json({ error: "appointment already exist is no longer available" });
    } else {
      console.log("exist");
    }

    // Validate service existence

    // Validate client existence

    // Create and save the appointment
    const appointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      venue,
      guests,
      specialRequests,
      eventType,
      price,
      status: "pending",
    });

    await appointment.save();
    const mailOptions = {
      from: "harshkamoriya@gmail.com",
      to: email,
      subject: "Appointment Scheduled - Pending Confirmation",
      html: `  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear <strong>${name}</strong>,</p>

        <p>Thank you for booking an appointment with us. We have received your request, and our team will reach out to you within the next <strong>6 hours</strong> to confirm the details.</p>

        <h3 style="color: #007BFF;">Appointment Details</h3>
        <p><strong>Service:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Current Status:</strong> <span style="color: orange;">Pending</span></p>

        <p>We appreciate your patience and look forward to assisting you. If you have any questions or need to reschedule, feel free to contact us.</p>

        <br>
        <p>Best regards,</p>
        <p><strong>Sunrise Events</strong></p>
        <p>📞 +91 98878 29699</p>
        <p>🌐 <a href="https://yourwebsite.com" style="color: #007BFF; text-decoration: none;">Visit our website</a></p>
    </div>`,
                };

    console.log(email, "user.email");
    console.log(mailOptions, "mailoptions");
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "call has been scheduled",
      appointment,
      appointmentId: appointment._id,
    });
  } catch (error) {
    console.log("error in catch backend", error.message);
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({ error: " 500 wala Server error", details: error.message });
  }
};

const getappointments = async (req, res) => {
  console.log("entered the function");
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
    console.log("fetched");
  } catch (error) {
    console.log("Error fetching appointments :", error);
    res.status(500).json({ message: "failed to fetch appointments ", error });
  }
};

const deleteappointment = async (req, res) => {
  console.log("Entered into delete function");
  console.log(req.body);

  const { id } = req.body;

  if (!id) {
    console.log("ID is required");
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    console.log("Request body:", req.body);
    console.log("Keys in req.body:", Object.keys(req.body));

    // Check if the appointment exists
    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      console.log("No matching appointment found in the database");
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Proceed to delete the matching appointment
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (deletedAppointment) {
      console.log("Appointment deleted successfully");
      return res
        .status(200)
        .json({ message: "Appointment deleted successfully" });
    } else {
      console.log("Appointment not found during deletion");
      return res
        .status(404)
        .json({ error: "Appointment not found during deletion" });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    return res.status(500).json({ error: "Error deleting appointment" });
  }
};

const deleteAppointmentsByDate = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    console.log("Date is required");
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    // Parse the date to a standard format (if needed)

    // Delete all appointments that match the specific date
    const result = await Appointment.deleteMany({ date });

    if (result.deletedCount > 0) {
      console.log(`Appointments on ${date} deleted successfully`);
      return res
        .status(200)
        .json({ message: `Appointments on ${date} deleted successfully` });
    } else {
      console.log(`No appointments found for ${date}`);
      return res
        .status(404)
        .json({ error: `No appointments found for ${date}` });
    }
  } catch (error) {
    console.error("Error deleting appointments:", error);
    return res.status(500).json({ error: "Error deleting appointments" });
  }
};

// Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);

  if (!id) {
    return res.status(400).json({ error: "Appointment ID is required" });
  }
  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Reschedule Appointment
const rescheduleAppointment = async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body to debug

  const { id, date, timeSlot } = req.body;
  console.log("id getting from request is :" + id);

  if (!id) {
    return res.status(400).json({ error: "Appointment ID is required" });
  }
  if (!date) {
    return res.status(400).json({ error: "New date is required" });
  }
  if (!timeSlot) {
    return res.status(400).json({ error: "New time slot is required" });
  }

  try {
    // Check if the new time slot is already booked
    const conflictingAppointment = await Appointment.findOne({
      date: date,
      timeSlot: timeSlot,
      status: "confirmed",
    });

    if (conflictingAppointment) {
      return res
        .status(400)
        .json({ error: "The selected time slot is already booked" });
    }

    // Update the appointment with the new date and time slot
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { date: date, timeSlot: timeSlot },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Appointment rescheduled successfully", appointment });
  } catch (error) {
    console.error("Error rescheduling appointment:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getAppointmentByName = async (req, res) => {
  const { name } = req.params; // Get name from URL parameter

  try {
    const appointments = await Appointment.find({ name }).sort({ date: -1 });
    console.log("appointments", appointments);
    if (appointments.length === 0) {
      console.log("Appointments for this name are not present");
      return res.status(404).json({ message: "Appointments not found" });
    }

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// create Razorpay order after booking appointment

const createRazorpayOrder = async (req, res) => {
  console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
  console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET);

  console.log("request body in the razorpay order is ", req.body);
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    console.log("order found is ", order);
    res.status(200).json(order);
  } catch (error) {
    console.log("error creating razorpay order :", error);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyPayment = async (req, res) => {
  console.log("Request body in the verifyPayment function is", req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const expected_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Body for signature:", body);
    console.log("Expected Signature:", expected_signature);
    console.log("Received Signature:", razorpay_signature);

    if (expected_signature === razorpay_signature) {
      const appointment = await Appointment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "confirmed", razorpayPaymentId: razorpay_payment_id },
        { new: true }
      );
      console.log("Payment successful:", appointment);
      console.log("response status , ", res.status);
      res
        .status(200)
        .json({ message: "Payment verified successfully", appointment });
    } else {
      console.log("Payment verification failed: Signature mismatch");

      console.error("Payment verification failed: Signature mismatch");
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.log("error is coming");

    console.error("error is coming", error.message);
    console.error("Error during payment verification:", error);
    res.status(500).json({ error: "Server error during payment verification" });
  }
};
export {
  bookSlots,
  getappointments,
  deleteappointment,
  deleteAppointmentsByDate,
  updateAppointmentStatus,
  rescheduleAppointment,
  getAppointmentByName,
  createRazorpayOrder,
  verifyPayment,
};
