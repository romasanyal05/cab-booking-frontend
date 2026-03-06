"use client";

import { useSearchParams } from "next/navigation";
import StripeWrapper from "./StripeWrapper";
import { Suspense } from "react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const driverId = searchParams.get("driverId") || "";

  const rideId = searchParams.get("rideId") || "";
  const amount = Number(searchParams.get("amount")) || 200;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Ride Payment
        </h2>

        <StripeWrapper
          amount={amount}
          rideId={rideId}
          driverId={driverId}
        />
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}