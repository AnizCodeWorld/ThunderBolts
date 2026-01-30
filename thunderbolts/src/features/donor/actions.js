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