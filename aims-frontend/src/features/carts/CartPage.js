import "./CartPage.css";
import HeaderBar from "../../components/layout/HeaderBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartService } from "../../services/cart.service";
import { useNumProduct } from "./NumProductInCartContext";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../common/utils";
const CartPage = () => {
  const navigate = useNavigate();

  const [listMedia, setListMedia] = useState([]);
  const [numProduct, setNumProduct] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const { updateNumProduct } = useNumProduct();

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
  }, [listMedia]);

  useEffect(() => {
    if (listMedia.length > 0) {
      let numItem = 0;
      let subtotal = 0;
      for (let item of listMedia) {
        numItem += item.quantity;
        subtotal += Math.round(item.price * item.quantity);
      }
      setNumProduct(numItem);
      updateNumProduct(numItem);
      setSubtotal(subtotal);
    } else {
      setNumProduct(0);
      updateNumProduct(0);
      setSubtotal(0);
    }
  }, [listMedia]);

  const handleOrder = () => {
    if (numProduct === 0) {
      toast.error("Không thể đặt hàng do giỏ hàng không có sản phẩm nào", {
        position: toast.POSITION.BOTTOM_RIGHT,
        containerId: "cartToast",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        theme: "colored",
      });
      return;
    }
    navigate("/delivery");
  };

  const handleQuantityItem = async (item, typeChange) => {
    try {
      if (item.quantity === 1 && typeChange === "subtract") return;
      else if (
        item.quantity === item.quantityAvailable &&
        typeChange === "add"
      ) {
        toast.error(
          `Không thể thêm do số lượng hàng tồn trong kho của sản phẩm ${item.title} không đủ: ${item.quantityAvailable}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            containerId: "cartToast",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            closeButton: false,
            theme: "colored",
          }
        );
        return;
      } else {
        await CartService.changeQuantityItemInCart(item.cartItemId, typeChange);
        getListMediaCart();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      await CartService.deleteItemInCart(item.cartItemId);
      toast.warning("Đã xóa sản phẩm khỏi giỏ hàng", {
        position: toast.POSITION.BOTTOM_RIGHT,
        containerId: "cartToast",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        theme: "colored",
      });
      getListMediaCart();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <HeaderBar />
      <ToastContainer containerId="cartToast" autoClose={3000} />
      <div className="cart-page">
        <div className="name-page">Giỏ hàng của bạn</div>
        <div className="num-products-text">
          Tổng số <span className="num-products">{numProduct} sản phẩm</span>
        </div>
        <div className="container">
          <div className="left-container">
            {listMedia.length > 0 && (
              <div className="table-container">
                <table>
                  <tbody>
                    <tr className="col-name">
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Đơn giá(VNĐ)</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                      <th></th>
                    </tr>
                    {listMedia.map((item, index) => (
                      <tr key={index} className="record">
                        <td>{index + 1}</td>
                        <td style={{ width: "450px" }}>
                          <div className="product">
                            <div className="product-image">
                              <img src={item.imageUrl} alt="product" />
                            </div>
                            <div className="product-name">{item.title}</div>
                          </div>
                        </td>
                        <td style={{ width: "135px" }}>
                          {formatNumber(item.price)}
                        </td>
                        <td>
                          <div className="quantity">
                            <div>
                              <FontAwesomeIcon
                                onClick={() =>
                                  handleQuantityItem(item, "subtract")
                                }
                                className="icon-quantity"
                                icon={faMinus}
                              />
                            </div>
                            <div>{item.quantity}</div>
                            <div>
                              <FontAwesomeIcon
                                onClick={() => handleQuantityItem(item, "add")}
                                className="icon-quantity"
                                icon={faPlus}
                              />
                            </div>
                          </div>
                        </td>
                        <td style={{ width: "135px" }}>
                          {formatNumber(item.price * item.quantity)}
                        </td>
                        <td style={{ width: "100px" }}>
                          <div>
                            <FontAwesomeIcon
                              onClick={() => handleDeleteItem(item)}
                              className="icon-delete"
                              icon={faTrashCan}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="right-container">
            <div className="cost-container">
              <div className="cost-item">
                <div>Tổng giá cả</div>
                <div>{formatNumber(subtotal)}đ</div>
              </div>
              <div className="cost-item">
                <div>VAT</div>
                <div>10%</div>
              </div>
              <div className="cost-item">
                <div>Tổng tiền</div>
                <div>{formatNumber(subtotal + (subtotal * 10) / 100)}đ</div>
              </div>
            </div>
            <div className="order-btn" onClick={handleOrder}>
              Đặt hàng
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
