import Service from "../models/services.js";
// Get all services
const getServices = async (req, res) => {
    console.log("Fetching services...");
    try {
        const services = await Service.find();
        console.log("services array is ", services) // Added 'await'
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching services", error: error.message });
    }
};

// Create a new service
const postService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({ message: "Service created successfully", success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating service", error: error.message });
    }
};

// Update a service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found", success: false });
        }

        res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating service", error: error.message });
    }
};

// Delete a service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);
        
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting service", error: error.message });
    }

   
};

const deleteAllServices = async (req, res) => {
    try {
        await Service.deleteMany({});
        res.status(200).json({ success: true, message: "All data deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting services", error: error.message });
    }
};


const postAllServices = async(req, res)=>{
    try {
        console.log("Received Data:", JSON.stringify(req.body, null, 2)); // Log incoming data
    
        await Service.insertMany(req.body);
        res.status(201).json({ success: true, message: "Services inserted successfully" });
      } catch (error) {
        console.error("Insertion Error:", error); // Log error details
        res.status(500).json({ success: false, message: "Error inserting services", error: error.message });
      }
}


export { getServices ,postService, updateService, deleteService,deleteAllServices,postAllServices };
