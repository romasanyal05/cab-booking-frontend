"use client";
import { Suspense } from "react";
import { useSearchParams , useRouter } from "next/navigation";
import { useEffect, useState } from "react";

 function ReceiptContent() {
  const searchParams = useSearchParams();
  const rideId = searchParams.get("rideId");
  const router = useRouter();
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    if (!rideId) return;

    fetch(`http://https://cab-booking-backend-f40a.onrender.com/api/payments/${rideId}`)
      .then((res) => res.json())
      .then((data) => setPayment(data));
  }, [rideId]);

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading receipt...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 print:bg-white">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 print:shadow-none print:border">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Cab Booking App</h1>
            <p className="text-sm text-gray-500">Official Payment Receipt</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Invoice No</p>
            <p className="font-semibold">
              {rideId?.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6"></div>

        {/* Details */}
        <div className="space-y-4 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-600">Ride ID</span>
            <span className="font-medium">{rideId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-semibold text-lg">
              ₹{payment.amount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Payment Status</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {payment.payment_status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date</span>
            <span>
              {new Date(payment.created_at).toLocaleString()}
            </span>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 mb-6"></div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mb-6">
          Thank you for choosing our service 🚖 <br />
          This is a computer generated receipt.
        </div>

        {/* Print Button */}
        <div className="flex justify-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
          >
            Print Receipt
          </button>
    <button
            onClick={() =>
              router.push(
                `/rate?rideId=${rideId}&driverId=${payment.driver_id}`
              )
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Rate Driver ⭐
          </button>
        </div>

      </div>
    </div>
  );
}    
 export default function ReceiptPage() { 
return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceiptContent />
    </Suspense>
  );
}