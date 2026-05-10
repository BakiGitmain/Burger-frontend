// 🔥 IMPORTS
import { createContext, useState } from "react";
import { useEffect } from "react";

// 🔥 CREATE CONTEXT (this is like a global storage box)
export const CartContext = createContext();


// 🔥 CREATE PROVIDER (this will wrap your whole app)
export function CartProvider({ children }) {

  
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
const clearCart = () => {
  setCart([]);
};
  const addToCart = (item) => {

    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );


      if (existingItem) {
        return prevCart.map((cartItem) => {
          
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1
            };
          }

          return cartItem;
        });
      }



      return [
        ...prevCart,
        {
          ...item,
          quantity: 1
        }
      ];
    });
  };


  // 🔥 REMOVE ITEM FUNCTION (we will need it later)
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };


  // 🔥 INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  // 🔥 DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        // remove item if quantity becomes 0
        .filter((item) => item.quantity > 0)
    );
  };


  // 🔥 CALCULATE TOTAL PRICE
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };


  // 🔥 RETURN PROVIDER
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}