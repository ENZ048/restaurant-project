import { useCart } from "../CartProvider";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="mx-3 text-lg">{item.quantity}</span>
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price & Checkout Button */}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
            <button className="mt-3 bg-green-500 text-white px-5 py-2 rounded">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
