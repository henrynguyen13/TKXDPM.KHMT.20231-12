import { createContext, useContext, useEffect, useState } from "react";
import { CartService } from "../../services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [listMedia, setListMedia] = useState([]);

  const getListMediaCart = async () => {
    try {
      const response = await CartService.getAllMediaInCart();
      setListMedia(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getListMediaCart();
  }, []);

  useEffect(() => {
    if (listMedia.length > 0) {
      let numItem = 0;
      let subtotal = 0;
      for (let item of listMedia) {
        numItem += item.quantity;
        subtotal += Math.round(item.price * item.quantity);
      }
      setSubtotal(subtotal);
    } else {
      setSubtotal(0);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        subtotal,
        listMedia,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
