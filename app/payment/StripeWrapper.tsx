"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY!
);

export default function StripeWrapper({ amount, rideId, driverId }: { amount: number; rideId: string; driverId: string;}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} 
      rideId={rideId}
      driverId={driverId}/>
    </Elements>
  );
}