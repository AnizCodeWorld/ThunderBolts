"use client";

import { useActionState } from "react";
import { createListing } from "@/features/donor/actions";

export default function DonationForm() {
  // state will hold the return value from our server action (success or error)
  const [state, formAction, isPending] = useActionState(createListing, null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post Surplus Food</h2>
      
    <form 
      key={state?.success ? "success" : "reset"} 
      action={formAction} 
      className="space-y-4"
    >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            name="title"
            placeholder="e.g., Dal Tadka and Rice"
            className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        {/* Type & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Type</label>
            <select name="foodType" className="w-full p-2 mt-1 border rounded-lg bg-white">
              <option value="Cooked">Cooked Meal</option>
              <option value="Raw">Raw Materials</option>
              <option value="Packaged">Packaged/Canned</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              name="quantity"
              placeholder="e.g., 50 plates / 10kg"
              className="w-full p-2 mt-1 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* Expiry Time - Crucial for Real-Time logic */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Best Before (Expiry Time)</label>
          <input
            type="datetime-local"
            name="expiryTime"
            className="w-full p-2 mt-1 border rounded-lg"
            required
          />
          <p className="text-xs text-gray-500 mt-1">When should this be removed from the list?</p>
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <textarea
            name="pickupAddress"
            rows="2"
            placeholder="Enter the full address for pickup"
            className="w-full p-2 mt-1 border rounded-lg"
            required
          ></textarea>
        </div>

        {/* Feedback Messages */}
        {state?.error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{state.error}</p>}
        {state?.success && <p className="text-green-600 text-sm bg-green-50 p-2 rounded">{state.success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            isPending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 shadow-lg"
          }`}
        >
          {isPending ? "Posting..." : "Broadcast to Nearby NGOs"}
        </button>
      </form>
    </div>
  );
}