import Service from "../models/services";

const getServices = async ()=>{
try {
    const services = Service.find();

res.status(200).json({success:true, data:services})    
} catch (error) {
    res.status(500).json({success:false, message:"Error fetching services" , error:error.message});
}
}

const postService = async ()=>{
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json({message:"service created successfully",success:true})
        
    } catch (error) {
        res.status(500).json({success:false, message:"error creating service", error:error.message});

    }
}
const updateService = async ()=>{
    try {
        const {id}= req.params;
        const updatedService = await Service.findOneAndUpdate({id:id}, req.body,{new:true});
        if(!updatedService){
            return res.status(404).json({message:"Service not found", success:false});

        }
    } catch (error) {
        res.status(500).json({success:false, message:"Error updating the service", error:error.message})
        
    }
    
}
const deleteService = async ()=>{

    try {
        const {id} =req.params;

        const deletedService = await Service.findOneAndDelete({id:id});
        if(!deletedService){
            return res.status(404).json({success:false, message:"service not found"})
        }
        res.status(200).json({success:true,message:"service delted successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:"Error deleting service" , error:error.message})
    }
    
}

export { getServices,postService, updateService,deleteService}