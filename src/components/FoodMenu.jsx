import React, { useState } from "react";
import { menuItems } from "../Data/menuItems";
import FoodCard from "../components/FoodCard/FoodCard";

const FoodMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique food categories
  const foodCategories = [
    { name: "All", image: "https://source.unsplash.com/100x100/?food" },
    { name: "Appetizer", image: "https://source.unsplash.com/100x100/?appetizer" },
    { name: "Main Course", image: "https://source.unsplash.com/100x100/?meal" },
    { name: "Dessert", image: "https://source.unsplash.com/100x100/?dessert" },
    { name: "Beverage", image: "https://source.unsplash.com/100x100/?drink" },
    { name: "Street Food", image: "https://source.unsplash.com/100x100/?street-food" },
    { name: "Bread", image: "https://source.unsplash.com/100x100/?bread" },
    { name: "Rice", image: "https://source.unsplash.com/100x100/?rice" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:mt-[7rem] xl:mt-[17rem] lg-mt[20rem]  2xl:mt-[26rem]">

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for food..."
          className="w-[60%] p-5 bg-white rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Food Type Cards */}
      <div className="flex gap-4 mb-6 overflow-x-auto justify-center">
        {foodCategories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center cursor-pointer p-2 transition-all ${
              selectedCategory === category.name ? "scale-105" : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md ${
                selectedCategory === category.name ? "border-yellow-400" : "border-gray-300"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <p
              className={`text-sm font-semibold mt-2 ${
                selectedCategory === category.name ? "text-yellow-500" : "text-gray-700"
              }`}
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <FoodCard key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">No items found 😔</p>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;
