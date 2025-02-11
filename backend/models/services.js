import mongoose from "mongoose";

// Schema for a package (Each package has different features)
const PackageSchema = new mongoose.Schema({
    features: { type: Map, of: String, default: {} }, // Dynamic key-value pairs for features
}, { _id: false });

// Main Service Schema
const ServiceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    packages: {
        exclusive: { type: PackageSchema, default: {} },
        premium: { type: PackageSchema, default: {} },
        elite: { type: PackageSchema, default: {} },
    },
}, { timestamps: true });

const Service = mongoose.models.Services || mongoose.model("Services", ServiceSchema);
export default Service;
