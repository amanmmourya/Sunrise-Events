
import Appointment from "../models/Appointment.js";

const bookSlots = async (req, res) => {
console.log("in the bookslots backend ")
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
        price
        
    } = req.body;

    // Input validation
   
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }
    if (!phone) {
        return res.status(400).json({ error: 'phone is required' });
    }
    if (!date) {
        return res.status(400).json({ error: 'date is required' });
    }
    if (!time) {
        return res.status(400).json({ error: 'time is important' });
    }
    
    if (!venue) {
        return res.status(400).json({ error: 'venue is required' });
    }
    if (!guests) {
        return res.status(400).json({ error: 'guests is required' });
    }
    if (!specialRequests) {
        return res.status(400).json({ error: 'specialRequest  is required' });
    }if (!eventType) {
        return res.status(400).json({ error: 'eventype is required' });
    }
    if (!price) {
        return res.status(400).json({ error: 'price name is required' });
    }

    try {
        console.log("in the try function")
        // Check if the time slot is already booked
        const existingAppointment = await Appointment.findOne({
            
            time,
            date,
            status: 'confirmed',
        });
        if (existingAppointment) {
            console.log('appointment already exist')
            return res.status(400).json({ error: 'appointment already exist is no longer available' });
        }else{
            console.log("exist")
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
            status:'pending'
         
        });

        await appointment.save();

        res.status(201).json({ message: 'Appointment confirmed', appointment });
    } catch (error) {
        console.log("error in catch backend",error.message)
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: ' 500 wala Server error',
            details:error.message,
         });
    }
};

const getappointments = async (req , res )=>{
    console.log("entered the function");
    try{
        const appointments =await Appointment.find();
        res.status(200).json(appointments);
        console.log("fetched")
    }catch(error){
        console.log("Error fetching appointments :" , error);
        res.status(500).json({message : "failed to fetch appointments ", error});
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
            return res.status(200).json({ message: "Appointment deleted successfully" });
        } else {
            console.log("Appointment not found during deletion");
            return res.status(404).json({ error: "Appointment not found during deletion" });
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
            return res.status(200).json({ message: `Appointments on ${date} deleted successfully` });
        } else {
            console.log(`No appointments found for ${date}`);
            return res.status(404).json({ error: `No appointments found for ${date}` });
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

        res.status(200).json({ message: "Appointment status updated successfully", appointment });
    } catch (error) {
        console.error("Error updating appointment status:", error.message);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Reschedule Appointment
const rescheduleAppointment = async (req, res) => {
    console.log("Request Body:", req.body);  // Log the request body to debug

    const { id, date, timeSlot } = req.body;
    console.log('id getting from request is :'+ id)

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
            return res.status(400).json({ error: "The selected time slot is already booked" });
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

        res.status(200).json({ message: "Appointment rescheduled successfully", appointment });
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
export {bookSlots ,getappointments,deleteappointment,
    deleteAppointmentsByDate,
    updateAppointmentStatus,
    rescheduleAppointment,
    getAppointmentByName};