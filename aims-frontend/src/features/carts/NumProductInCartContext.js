import { createContext, useContext, useEffect, useState } from 'react';
import { CartService } from '../../services/cart.service';

const NumProductContext = createContext();

export const NumProductProvider = ({ children }) => {
  const [numProduct, setNumProduct] = useState(0);

  const getNumMediaCart = async () => {
    try {
        const response = await CartService.getNumMediaInCart();
        setNumProduct(response.data);
    } catch (err) {
        console.error('Error:', err);
    }
  };

  useEffect(() => {
    getNumMediaCart();
  }, []);

  const updateNumProduct = (newNumProduct) => {
    setNumProduct(newNumProduct);
  };

  return (
    <NumProductContext.Provider value={{ numProduct, updateNumProduct }}>
      {children}
    </NumProductContext.Provider>
  );
};

export const useNumProduct = () => {
  return useContext(NumProductContext);
};