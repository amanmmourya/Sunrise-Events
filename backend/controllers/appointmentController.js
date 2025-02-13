
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

export {bookSlots ,getappointments};