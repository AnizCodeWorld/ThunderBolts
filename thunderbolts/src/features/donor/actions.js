"use server";

import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function createListing(prevState, formData) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  await connectDB();

  // 1. Extract exactly what the form sends
  const title = formData.get("title");
  const foodType = formData.get("foodType");
  const quantity = formData.get("quantity");
  const expiryTime = formData.get("expiryTime");
  const pickupAddress = formData.get("pickupAddress"); // Ensure this matches name="pickupAddress" in form

  // 2. Comprehensive Validation Check
  if (!title || !foodType || !quantity || !expiryTime || !pickupAddress) {
    return { error: "Missing fields. Please check Title, Type, Quantity, Expiry, and Address." };
  }

  try {
    await Listing.create({
      donorId: session.user.id,
      title,
      description: title, // Using title as description since form doesn't have a desc field
      foodType,
      quantity,
      pickupAddress,
      expiryTime: new Date(expiryTime),
      status: "available",
    });

    revalidatePath("/donor");
    return { success: "Donation posted successfully!" };
  } catch (error) {
    // 3. Log the ACTUAL error to your console so you can see the field name failing
    console.error("MONGODB_SAVE_ERROR:", error.message);
    return { error: `Database Error: ${error.message}` };
  }
}

export async function completeListing(listingId) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "donor") return { error: "Unauthorized" };

  await connectDB();

  try {
    const updated = await Listing.findOneAndUpdate(
      { _id: listingId, donorId: session.user.id, status: "claimed" },
      { $set: { status: "completed" } },
      { new: true }
    );

    if (!updated) return { error: "Could not update. Item may not be claimed yet." };

    // This clears the cache for both dashboards instantly
    revalidatePath("/donor");
    revalidatePath("/organisation");

    return { success: true };
  } catch (error) {
    return { error: "Database error." };
  }
}
export async function completeTransaction(listingId) {
  try {
    await connectDB();

    // 1. Update status to 'completed'
    // This effectively "removes" it from active views because active views 
    // should filter for status: 'available' or 'pending'
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { 
        status: 'completed',
        completedAt: new Date() 
      },
      { new: true }
    );

    if (!updatedListing) {
      return { success: false, error: "Listing not found" };
    }

    // 2. Clear cache for Donor and NGO dashboards
    revalidatePath("/donor");
    revalidatePath("/ngo");

    return { success: true };
  } catch (error) {
    console.error("Transaction Completion Error:", error);
    return { success: false, error: "Internal Server Error" };
  }
}