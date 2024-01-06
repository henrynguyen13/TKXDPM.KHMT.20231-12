import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/layout/HeaderBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './HistoryPage.css';
import { OrderService } from "../../services/order.service";
import { formatNumber } from "../../common/utils";

const HistoryPage = () => {

    const [listOrderHistory, setListOrderHistory] = useState([]);

    const getListHistoryOrder = async () => {
        try {
          const response = await OrderService.getHistoryOrder();
          setListOrderHistory(response.data.data);
        } catch (err) {
          console.error("Error:", err);
        }
    };

    useEffect(() => {
        getListHistoryOrder();
    }, [])

    const handleCancelOrder = async (id) => {
        try {
          await OrderService.cancelOrder(id);
          toast.success("Hủy đơn hàng thành công", {
            position: toast.POSITION.TOP_CENTER,
            containerId: "cartToast",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            closeButton: false,
            theme: "colored",
          });
          getListHistoryOrder();
        } catch (err) {
          console.error("Error:", err);
        }
    };
    
    return (
        <>
            <HeaderBar />
            <ToastContainer containerId="historyToast" autoClose={3000} />
            <div className="history-order-page">
                <div className="top-container">
                    <div className="name-page">Lịch sử đặt hàng</div>
                    <div className="num-order"><span style={{ color: '#209ed4', fontWeight: 'bold' }}>{listOrderHistory.length}</span> đơn hàng</div>
                </div>
                {listOrderHistory.length > 0 && (
                <div className="list-order-container">
                    <table>
                        <tbody>
                            <tr className="col-name">
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Thông tin đơn hàng</th>
                                <th></th>
                            </tr>
                            {listOrderHistory.map((order, index) => (
                            <tr key={index} className="order-item">
                                <td>{index + 1}</td>
                                <td style={{ width: "600px" }}>
                                    <div className="list-product">
                                        {order.listProduct.map((item, index) => (
                                        <div key={index} className="product-item">
                                            <div className="product-img"><img src={item.mainImg} alt="" /></div>
                                            <div className="info-product-order">
                                                <div className="product-name">{item.title}</div>
                                                <div className="info-field">
                                                    <div>Số lượng:</div>
                                                    <div>{item.quantity}</div>
                                                </div>
                                                <div className="info-field">
                                                    <div>Tổng tiền:</div>
                                                    <div>{formatNumber(item.price * item.quantity)} VND</div>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ width: "700px" }}>
                                    <div className="info-order">
                                        <div className="info-item">
                                            <div className="key">Tên người nhận:</div>
                                            <div>{order.name}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Số điện thoại:</div>
                                            <div>{order.phone}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Tỉnh/Thành phố:</div>
                                            <div>{order.city}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Địa chỉ giao hàng:</div>
                                            <div>{order.address}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Chỉ dẫn giao hàng:</div>
                                            <div>{order.shippingInstruction}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Giao hàng nhanh:</div>
                                            <div>{order.shippingMethod === 'Giao hàng tiêu chuẩn' ? 'Không' : 'Có'}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Thông tin giao hàng nhanh:</div>
                                            <div>{order.shipmentDetails}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Chỉ dẫn giao hàng nhanh:</div>
                                            <div>{order.deliveryInstruction}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Thời gian nhận hàng(GHN):</div>
                                            <div>{order.deliveryTime}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Tổng tiền:</div>
                                            <div>{formatNumber(order.originPrice)} VND</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">VAT(10%):</div>
                                            <div>{formatNumber(order.vat)} VND</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Phí giao hàng:</div>
                                            <div>{formatNumber(order.shippingFee)} VND</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="key">Tổng tiền phải trả:</div>
                                            <div>{formatNumber(order.totalAmount)} VND</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ width: "250px" }}>
                                    <div className="cancel-order-btn" onClick={() => handleCancelOrder(order.id)}>Hủy đơn hàng</div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
        </>
    );

};

export default HistoryPage;
