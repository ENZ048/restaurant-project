import { useState } from "react";
import { useCart } from "../../CartProvider";
import { useNavigate } from "react-router-dom"; 
import { FaStar, FaRegStar } from "react-icons/fa"; 
import { FcClock } from "react-icons/fc";
import { Snackbar, Alert } from "@mui/material";

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...item, quantity });
    setOpenSnackbar(true);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg card" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
      {/* Rating Stars */}
      <div className="flex justify-end text-yellow-400 mb-3">
        {Array.from({ length: 5 }).map((_, index) =>
          index < Math.floor(item.rating) ? <FaStar key={index} /> : <FaRegStar key={index} />
        )}
      </div>

      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-gray-600 text-md">Price: ₹{item.price}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mt-2 space-x-2">
        <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded" onClick={handleDecrease}>−</button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded" onClick={handleIncrease}>+</button>
      </div>

      {/* Add to Cart & Go to Cart Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="bg-orange-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-orange-700" onClick={handleAddToCart}>Add to Cart</button>
        <button className="bg-orange-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-orange-700" onClick={() => navigate("/cart")}>Go to Cart</button>
      </div>

      <p className="flex justify-center gap-3 items-center"><FcClock /> Est : {item.estimatedTime}</p>

      {/* MUI Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          {item.name} added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FoodCard;
