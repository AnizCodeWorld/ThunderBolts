import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // General Name or Admin Name
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["donor", "ngo"], required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  
  // Specific Data for Donors
  donorDetails: {
    donorType: { type: String, enum: ["Individual", "Restaurant", "Hotel", "Caterer", "Other"] },
    address: String,
    phoneNumber: String,
    businessLicense: String, // Optional FSSAI or business ID
  },

  // Specific Data for NGOs
  ngoDetails: {
    ngoName: String,
    ngoType: { type: String, enum: ["Food Bank", "Orphanage", "Shelter Home", "Community Kitchen", "Other"] },
    registrationType: { type: String, enum: ["Society", "Trust", "Section 8 Company", "Other"] },
    registrationNumber: String,
    ngoDarpanId: String,
    reg12A: String,
    reg80G: String,
    fcraNumber: String,
    address: String,
    pinCode: String,
    phoneNumber: String,
    beneficiaryCapacity: Number,
    documents: [String], // Array of URLs (e.g., from Cloudinary/AWS S3)
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);