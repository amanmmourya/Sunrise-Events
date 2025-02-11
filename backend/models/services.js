import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
    venueDecoration: { type: String },
    stageDesign: { type: String },
    lighting: { type: String },
    seatingArrangement: { type: String },
    floralArrangement: { type: String },
    centerpieces: { type: String },
    entrySetup: { type: String },
    mandap: { type: String },
    soundAndDJ: { type: String },
    fireworks: { type: String },
    catering: { type: String },
}, { _id: false }); // Prevents creation of unnecessary _id fields inside features

const PackageSchema = new mongoose.Schema({
    features: { type: FeatureSchema, default: {} },
}, { _id: false }); // Prevents unnecessary _id fields inside packages

const ServiceSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    packages: {
        exclusive: { type: PackageSchema, default: {} },
        premium: { type: PackageSchema, default: {} },
        elite: { type: PackageSchema, default: {} },
    },
});

const Service = mongoose.models.Services || mongoose.model("Services", ServiceSchema);
export default Service;
