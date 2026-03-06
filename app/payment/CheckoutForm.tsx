"use client";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
export default function CheckoutForm({ amount, rideId, driverId }: { amount: number; rideId: string; driverId: string; }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 const handleSubmit = async (e: any) => {
  e.preventDefault();
  if(loading) return;
  setLoading(true);

  console.log("🔹 RideId inside CheckoutForm:", rideId);
  console.log("🔹 Amount:", amount);

  const res = await fetch(
    "http://localhost:5000/api/create-payment-intent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }
  );

  console.log("🔹 Payment intent response status:", res.status);

  const { clientSecret } = await res.json();
  console.log("🔹 Client Secret:", clientSecret);

  const result = await stripe?.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements?.getElement(CardElement)!,
    },
  });

  console.log("🔹 Stripe confirm result:", result);

  if (result?.paymentIntent?.status === "succeeded") {
  console.log("✅ Payment succeeded, calling backend with rideId:", rideId);

  // 1️⃣ Mark ride as paid
  const payRes = await fetch(
    `http://localhost:5000/api/rides/${rideId}/pay`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }
  );

  console.log("🔹 Backend pay response status:", payRes.status);

  // 2️⃣ Send receipt email
  const emailRes = await fetch(
    "http://localhost:5000/api/send-receipt",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rideId,
        amount,
      }),
    }
  );

  console.log("📧 Email API response:", emailRes.status);

  // 3️⃣ Redirect to rating page
  router.push(`/rate?rideId=${rideId}&driverId=${driverId}`);

} else {
  alert("Payment Failed ❌");
}
setLoading(false);
 };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <CardElement />
      </div>
      <button type="submit">
        Pay ₹{amount}
      </button>
    </form>
  );
 }