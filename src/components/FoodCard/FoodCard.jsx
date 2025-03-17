import { useState } from "react";
import { useCart } from "../../CartProvider";
import { useNavigate } from "react-router-dom"; 

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-gray-600">₹{item.price}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mt-2 space-x-2">
        <button
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          onClick={handleDecrease}
        >
          −
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>

      {/* Add to Cart & Go to Cart Buttons */}
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => addToCart({ ...item, quantity })}
        >
          Add to Cart
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate("/cart")}
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
