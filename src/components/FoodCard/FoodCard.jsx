import React from 'react'

export default function FoodCard({item}) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition duration-300">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
      <p className="text-gray-500">{item.type}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-lg">{item.price}</span>
        <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
      </div>
      <p className="text-sm text-gray-400 mt-1">⏳ {item.estimatedTime}</p>
    </div>
  );
}
