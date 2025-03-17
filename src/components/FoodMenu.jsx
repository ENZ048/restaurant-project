import React, { useState } from "react";
import { menuItems } from "../Data/menuItems";
import FoodCard from "../components/FoodCard/FoodCard";
import Divider from "@mui/material/Divider";

const FoodMenu = ({cart, addToCart}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const foodCategories = [
    { name: "All", image: "https://source.unsplash.com/100x100/?food" },
    {
      name: "Appetizer",    
      image: "https://source.unsplash.com/100x100/?appetizer",
    },
    { name: "Main Course", image: "https://source.unsplash.com/100x100/?meal" },
    { name: "Dessert", image: "https://source.unsplash.com/100x100/?dessert" },
    { name: "Beverage", image: "https://source.unsplash.com/100x100/?drink" },
    {
      name: "Street Food",
      image: "https://source.unsplash.com/100x100/?street-food",
    },
    { name: "Bread", image: "https://source.unsplash.com/100x100/?bread" },
    { name: "Rice", image: "https://source.unsplash.com/100x100/?rice" },
  ];

  const filteredMenu =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.type === selectedCategory);

  const sortedMenu = [...filteredMenu].sort((a, b) => {
    if (sortOption === "priceLowHigh") {
      return (
        parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""))
      );
    } else if (sortOption === "priceHighLow") {
      return (
        parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", ""))
      );
    } else if (sortOption === "ratingLowHigh") {
      return a.rating - b.rating;
    } else if (sortOption === "ratingHighLow") {
      return b.rating - a.rating;
    }
    return 0;
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
              selectedCategory === category.name
                ? "scale-105"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-md ${
                selectedCategory === category.name
                  ? "border-yellow-400"
                  : "border-gray-300"
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
                selectedCategory === category.name
                  ? "text-yellow-500"
                  : "text-gray-700"
              }`}
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>

      <Divider sx={{ borderColor: 'yellow' }}>Most Popolar</Divider>

      {/* Sort Option */}

      <div>
        <div className="flex justify-end mb-4 mt-4">
          <select
            className="p-2 border rounded bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingLowHigh">Rating: Low to High</option>
            <option value="ratingHighLow">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedMenu.map((item) => (
        //   <div key={item.id} className="border p-4 rounded-lg shadow">
        //     <img
        //       src={item.image}
        //       alt={item.name}
        //       className="w-full h-32 object-cover rounded-md"
        //     />
        //     <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
        //     <p className="text-gray-600">{item.price}</p>
        //     <p className="text-yellow-500">⭐ {item.rating}</p>
        //   </div>
        <FoodCard key={item.id} item={item} cart={cart} addToCart={addToCart}/>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
