import { createContext, useState, useContext } from "react";

// Create Context
export const CartContext = createContext(null);

// Custom Hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        // If the item already exists, create a new array with an updated quantity
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // Create a new object
            : cartItem
        );
      } else {
        // If the item is not in the cart, add it
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  
    alert("Item added to cart");
  };
  

  // Update quantity function
  const updateQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };
  
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
