"use server";

import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function claimListing(listingId) {
  const session = await getServerSession(authOptions);

  // 1. Security Check
  if (!session || session.user.role !== "ngo") {
    return { error: "Only verified NGOs can claim food." };
  }

  await connectDB();

  try {
    // 2. Atomic Update
    // We search for the ID AND ensure it is still "available" 
    // This prevents "Double Claiming"
    const updatedListing = await Listing.findOneAndUpdate(
      { 
        _id: listingId, 
        status: "available" 
      },
      { 
        $set: { 
          status: "claimed", 
          claimedBy: session.user.id 
        } 
      },
      { new: true } // returns the updated document
    );

    if (!updatedListing) {
      return { error: "Too late! This food was just claimed by someone else or is no longer available." };
    }

    // 3. Refresh the dashboards
    revalidatePath("/organisation"); // Refresh NGO feed
    revalidatePath("/donor");        // Refresh Donor's "Live Listings"

    return { success: "Food claimed successfully! Please proceed for pickup." };
  } catch (error) {
    console.error("CLAIM_ERROR:", error);
    return { error: "Failed to claim listing. Please try again." };
  }
}