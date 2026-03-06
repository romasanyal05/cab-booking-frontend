"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
});

//type User = {
 // id: string;
 // name: string;
  //email: string;
  //phone: string;
  //role: string;
  //};

export default function Dashboard() {
 // const [users, setUsers] = useState<User[]>([]);
 // const [loading, setLoading] = useState(true);

  //useEffect(() => {
   // fetch("https://cab-booking-backend-f40a.onrender.com")
     // .then((res) => res.json())
     // .then((data) => {
      //  setUsers(data);
       // setLoading(false);
    //  });
 // }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Cab Booking – User Dashboard
      </h1>

      {/* USERS */}
      {/*
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded shadow"
              >
                <p className="text-xs text-gray-500">ID: {user.id}</p>
                <p className="font-semibold">{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <span className="text-sm">{user.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
           */}
      {/* MAP */}
      <div className="mb-6">
        <MapPicker
          onPickupSelect={(val) => {
            (
              document.querySelector(
                'input[name="pickup"]'
              ) as HTMLInputElement
            ).value = val;
          }}
          onDropSelect={(val) => {
            (
              document.querySelector(
                'input[name="drop"]'
              ) as HTMLInputElement
            ).value = val;
          }}
        />
      </div>

      {/* UPDATE PROFILE */}
      {/*
      <div className="bg-white p-6 rounded shadow max-w-md">
        <h2 className="text-xl font-semibold mb-3">Update Profile</h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;

            const id = (form.elements.namedItem("id") as HTMLInputElement).value;
            const name = (form.elements.namedItem("name") as HTMLInputElement)
              .value;
            const phone = (form.elements.namedItem("phone") as HTMLInputElement)
              .value;

            await fetch(`http://https://cab-booking-backend-f40a.onrender.com/api/users/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, phone }),
            });

            alert("Profile updated");
          }}
          className="space-y-3"
        >
          <input name="id" placeholder="User ID" className="border p-2 w-full" />
          <input name="name" placeholder="New Name" className="border p-2 w-full" />
          <input name="phone" placeholder="New Phone" className="border p-2 w-full" />
          <input name="pickup" placeholder="Pickup Location" className="border p-2 w-full" />
          <input name="drop" placeholder="Drop Location" className="border p-2 w-full" />

          <button className="bg-black text-white p-2 w-full">
            Update
            </button>
        </form>
      </div>
           */}
            {/* RIDE REQUEST */}
<div className="max-w-lg bg-white rounded-xl shadow-md p-6 mt-10">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">
    🚖 Request a Ride
  </h2>

  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const form = e.currentTarget;

      const user_id = " dee0d99e-a8dd-48d5-bc52-8fbf05a7a533";
      const pickup_location = (form.elements.namedItem("pickup") as HTMLInputElement).value;
      const drop_location = (form.elements.namedItem("drop") as HTMLInputElement).value;
if (!user_id || !pickup_location || !drop_location) {
  return;
}
      const res = await fetch("http://https://cab-booking-backend-f40a.onrender.com/api/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          pickup_location,
          drop_location,
        }),
      });

      if (res.ok) {
        alert("Ride request created");
        form.reset();
      } else {
        alert("Failed to create ride");
      }
    }}
    className="space-y-3"
  >
    <input
      name="user_id"
      placeholder="User ID"
      className="w-full border rounded px-3 py-2"
      required
    />

    <input
      name="pickup"
      placeholder="Pickup Location"
      className="w-full border rounded px-3 py-2"
      required
    />

    <input
      name="drop"
      placeholder="Drop Location"
      className="w-full border rounded px-3 py-2"
      required
    />

    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
      Book Ride

          </button>
        </form>
      </div>
       </div>
      
    );
    }
