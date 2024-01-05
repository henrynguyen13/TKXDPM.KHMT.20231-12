import { createContext, useContext, useEffect, useState } from "react";
import { CartService } from "../../services/cart.service";
import { useNumProduct } from "./NumProductInCartContext";
import ToastUtil from "../../common/utils";
import { ProductService } from "../../services/products.service";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { updateNumProduct, numProduct } = useNumProduct();

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
      console.log("subtotal", subtotal);
      setSubtotal(subtotal);
    } else {
      setSubtotal(0);
    }
  }, [listMedia]);
  const addMediaToCart = async (product) => {
    console.log(
      "hi",
      listMedia.find((r) => r?.mediaId === product?.id)?.quantity
    );
    if (
      listMedia.find((r) => r?.mediaId === product?.id)?.quantity >=
      product.quantityAvailable
    ) {
      ToastUtil.showToastError(
        `Không thể thêm do số lượng hàng tồn trong kho của sản phẩm ${product.title} không đủ: ${product.quantityAvailable}`
      );
      return;
    } else {
      const response = await ProductService.addMediaToCart("1", product?.id, 1);
      if (response?.data?.message === "Success") {
        updateNumProduct(numProduct + 1);
        ToastUtil.showToastSuccess("Thành công!");
      }
    }
  };
  return (
    <CartContext.Provider
      value={{
        subtotal,
        listMedia,
        addMediaToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
