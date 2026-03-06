"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DRIVER_ID = "edb20b4e-3b07-484f-b077-48f48e216f71";

export default function DriverDashboard() {
  const [rides, setRides] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`http://https://cab-booking-backend-f40a.onrender.com/api/driver/${DRIVER_ID}/rating`)
      .then((res) => res.json())
      .then((data) => {
        setAverage(data.average || 0);
        setTotal(data.total || 0);
      })
      .catch((err) => console.error(err));
  }, []);

  const fetchRides = async () => {
    if (!city) {
      alert("Please enter city");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://https://cab-booking-backend-f40a.onrender.com/api/rides?city=${city}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch rides");
      }

      const data = await res.json();
      setRides(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching rides");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (rideId: string, action: string) => {
    try {
      const res = await fetch(
     `https://cab-booking-backend-f40a.onrender.com/api/rides/${rideId}/${action}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ driver_id: DRIVER_ID }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update ride");
      }

      fetchRides();

      setNotification({
        message: `Ride ${action} successful`,
        type: "success",
      });

      setTimeout(() => setNotification(null), 3000);

    } catch (error) {
      setNotification({
        message: "Something went wrong",
        type: "error",
      });

      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Driver Dashboard
            </h1>
            <p className="text-yellow-500 font-semibold mt-1">
              ⭐ {average} ({total} reviews)
            </p>
          </div>

          <div className="flex gap-2">
            <input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={fetchRides}
              className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
            >
              Load
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-gray-500 text-center">Loading rides...</p>
        )}

        {!loading && rides.length === 0 && (
          <p className="text-gray-400 text-centermt-20">No rides found</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-xl shadow-md p-6 space-y-3 hover:shadow-lg transition"
            >
              <p><span className="font-semibold">Pickup:</span> {ride.pickup_location}</p>
              <p><span className="font-semibold">Drop:</span> {ride.drop_location}</p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-blue-600">{ride.ride_status}</span>
              </p>

              {ride.ride_status === "requested" && (
                <button
                  onClick={() => updateStatus(ride.id, "accept")}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Accept Ride
                </button>
              )}

              {ride.ride_status === "accepted" && (
                <button
                  onClick={() => updateStatus(ride.id, "start")}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Start Ride
                </button>
              )}

              {ride.ride_status === "ongoing" && (
                <button
                  onClick={() => updateStatus(ride.id, "complete")}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Complete Ride
                </button>
              )}

              {ride.ride_status === "completed" && (
                <div className="space-y-2">
                  <p className="text-green-600 font-semibold">
                    Ride Completed ✅
                  </p>

                  <button
                    onClick={() =>
                      router.push(
                        `/payment?rideId=${ride.id}&amount=${ride.fare || 200}&driverId=${ride.driver_id}`
                      )
                    }
                    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg ${
              notification.type === "success"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {notification.message}
          </div>
        )}

      </div>
    </div>
  );
}