import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  // Reference to the Donor (User model)
  donorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  
  // Basic Food Info
  title: { 
    type: String, 
    required: [true, "Please provide a title for the donation"],
    trim: true 
  },
  description: { 
    type: String, 
    required: [true, "Please describe the food items"] 
  },
  foodType: { 
    type: String, 
    enum: ["Cooked", "Raw", "Packaged", "Other"], 
    required: true 
  },
  
  // Quantity & Logistics
  quantity: { 
    type: String, 
    required: [true, "Please specify quantity (e.g., '10 kg' or '20 plates')"] 
  },
  pickupAddress: { 
    type: String, 
    required: [true, "Pickup address is required"] 
  },
  
  // Safety Timestamps
  cookedTime: { 
    type: Date 
  }, 
  expiryTime: { 
    type: Date, 
    required: [true, "Expiry time is critical for food safety"] 
  },
  
  // Transaction State
  status: { 
    type: String, 
    enum: ["available", "claimed", "completed", "expired"], 
    default: "available" 
  },
  
  // Reference to the NGO who claims the food
  claimedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    default: null
  }
}, { 
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

// Create an index on status and expiryTime for faster queries on the NGO feed
ListingSchema.index({ status: 1, expiryTime: 1 });

export default mongoose.models.Listing || mongoose.model("Listing", ListingSchema);