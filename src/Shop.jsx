import React from "react";

const paintings = [
  {
    id: 1,
    name: "Sunset Over Lake",
    image: "/images/painting1.png",
    price: 120.0,
    available: true,
  },
  {
    id: 2,
    name: "Abstract Dreams",
    image: "/images/painting2.png",
    price: 95.0,
    available: true,
  },
  {
    id: 3,
    name: "Floral Harmony",
    image: "/images/painting3.png",
    price: 150.0,
    available: false,
  },
];

export default function Shop() {
  return (
    <section id="shop" className="py-10 px-2 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {paintings.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded mb-3" />
            <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
            <p className="text-blue-700 font-bold mb-1">${p.price.toFixed(2)}</p>
            <p className={p.available ? "text-green-600" : "text-red-500"}>
              {p.available ? "Available" : "Sold Out"}
            </p>
            {p.available && (
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Buy</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
