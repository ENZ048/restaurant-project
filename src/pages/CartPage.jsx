import { useState } from "react";
import { useCart } from "../CartProvider";
import { Snackbar, Alert } from "@mui/material";
import "./homepage.css";
import Navbar from "../components/Navbar/Navbar";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPrice = subtotal - discount;

  const applyCoupon = () => {
    if (coupon === "FIRST20") {
      setDiscount(subtotal * 0.2);
      setSnackbar({
        open: true,
        message: "Coupon applied successfully! 20% discount added.",
        severity: "success",
      });
    } else {
      setDiscount(0);
      setSnackbar({
        open: true,
        message: "Invalid coupon code. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-[85vh] home-bg">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg cart-bg">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center">
                    <button
                      className="bg-gray-300 text-gray-800 cursor-pointer px-3 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="mx-3 text-lg">{item.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-800 cursor-pointer px-3 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Coupon Code */}
              <div className="mt-4  flex justify-between">
                <div className="">
                  <h1>Use "FIRST20" for 20% off on your first order!</h1>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="border px-3 py-2 rounded w-full"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 cursor-pointer rounded w-full"
                    onClick={applyCoupon}
                  >
                    Apply Coupon
                  </button>
                </div>

                {/* Total Price & Checkout Button */}
                <div className="mt-6 text-right ">
                  <p className="text-lg">Subtotal: ₹{subtotal.toFixed(2)}</p>
                  <p className="text-lg text-green-600">
                    Discount: -₹{discount.toFixed(2)}
                  </p>
                  <p className="text-xl font-bold">
                    Total: ₹{totalPrice.toFixed(2)}
                  </p>
                  <button className="mt-3 bg-green-500 cursor-pointer text-white px-5 py-2 rounded">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MUI Snackbar for success/error messages */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default CartPage;
