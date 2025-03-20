import React, { useState } from "react";
import { menuItems } from "../Data/menuItems";
import FoodCard from "../components/FoodCard/FoodCard";
import Divider from "@mui/material/Divider";
import All from "../assets/cat-all.jpg";
import apitize from "../assets/apitize.jpg";
import mainCourse from "../assets/main.jpg";

const FoodMenu = ({ cart, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const foodCategories = [
    { name: "All", image: All },
    {
      name: "Appetizer",
      image: apitize,
    },
    { name: "Main Course", image: mainCourse },
    {
      name: "Dessert",
      image:
        "https://img.freepik.com/premium-photo/high-angle-view-desserts-table_1048944-8734558.jpg?ga=GA1.1.1131793102.1736608136&semt=ais_hybrid",
    },
    {
      name: "Beverage",
      image:
        "https://img.freepik.com/premium-photo/vermouth-cocktail-inside-martini-glass-dark-background_135932-238.jpg?ga=GA1.1.1131793102.1736608136&semt=ais_hybrid",
    },
    {
      name: "Street Food",
      image:
        "https://img.freepik.com/free-photo/side-view-doner-with-grilled-chicken-greens-lettuce-tomato-french-fries-table_141793-4881.jpg?ga=GA1.1.1131793102.1736608136&semt=ais_hybrid",
    },
    {
      name: "Bread",
      image:
        "https://img.freepik.com/free-photo/delicious-assortment-traditional-roti_23-2149033989.jpg?ga=GA1.1.1131793102.1736608136&semt=ais_hybrid",
    },
    {
      name: "Rice",
      image:
        "https://img.freepik.com/free-photo/appetizing-healthy-rice-with-vegetables-white-plate-wooden-table_2829-19773.jpg?ga=GA1.1.1131793102.1736608136&semt=ais_hybrid",
    },
  ];

  const filteredMenu = menuItems
  .filter((item) =>
    selectedCategory === "All" ? true : item.type === selectedCategory
  )
  .filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="container mx-auto px-4 mt-15">
      <div className="bg-white/80 rounded p-5">
        {/* Search Input */}
        <div className="mb-4">
          <p
            style={{
              fontSize: "2rem",
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "orange",
              marginBottom: "1rem",
            }}
          >
            What would you like to order?
          </p>
          <input
            type="text"
            placeholder="Search for food..."
            className="w-[60%] p-5 bg-white rounded-md shadow-sm border border-gray-300 focus:border-orange-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Food Type Cards */}
        <div className="flex gap-4 mb-6 overflow-x-auto lg:justify-center">
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

        <Divider
          sx={{
            fontSize: "2rem",
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "orange",
          }}
        >
          Most Popolar
        </Divider>

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
            <FoodCard
              key={item.id}
              item={item}
              cart={cart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
