"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

 function RateContent() {
  const params = useSearchParams();
  const rideId = params.get("rideId");
  const driverId = params.get("driverId");
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitRating = async () => {
    if (!rideId || !driverId) return;

    const res = await fetch("http://https://cab-booking-backend-f40a.onrender.com/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ride_id: rideId,
        driver_id: driverId,
        rating,
        review,
      }),
    });

    if (res.ok) {
      alert("Rating submitted successfully ⭐");
      router.push("/"); // redirect after rating
    } else {
      alert("Error submitting rating");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">

        <h1 className="text-2xl font-semibold text-center">
          Rate Your Ride
        </h1>

        <div className="text-center text-gray-600">
          How was your experience?
        </div>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded-lg"
        >
          <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
          <option value={4}>⭐⭐⭐⭐ - Very Good</option>
          <option value={3}>⭐⭐⭐ - Good</option>
          <option value={2}>⭐⭐ - Poor</option>
          <option value={1}>⭐ - Very Bad</option>
        </select>

        <textarea
          placeholder="Write a review (optional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={submitRating}
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}
export default function RatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RateContent />
    </Suspense>
  );
}
