"use server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(payload) {
  try {
    await connectDB();
    const { email, password, role, ...details } = payload;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return { error: "User already exists" };

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: role === 'ngo' ? details.ngoName : details.name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      status: "pending", // Default to pending for verification
    };

    if (role === 'ngo') {
      userData.ngoDetails = details;
    } else {
      userData.donorDetails = details;
    }

    const newUser = new User(userData);
    await newUser.save();
    return { success: true };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Registration failed. Check all fields." };
  }
}





