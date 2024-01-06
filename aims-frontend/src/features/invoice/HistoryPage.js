import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/layout/HeaderBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumber } from "../../common/utils";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllOrdersAPIs } from "../../APIs/OrderAPIs";



const HistoryPage = () => {
    let [orders, setOrders] = useState([]);
    useEffect(() => {
        getAllOrdersAPIs().then((res) => {
            setOrders(res)
        })
    }, [])
  
    let items = orders ?
        orders.map((order, index) => {

            let tBody = order.medias ?
                order.medias.map((media, i) => {
                    return (<tr key={i} className="record">
                        <td>{i+1}</td>
                        <td style={{ width: "450px" }}>
                            <div className="product">
                                <div className="product-image">
                                    <img src={media.imageUrl} alt="product" />
                                </div>
                                <div className="product-name">{media.title}</div>
                            </div>
                        </td>
                        <td style={{ width: "135px" }}>
                            {formatNumber(media.price)}
                        </td>
                        <td>
                            <div className="quantity">
                                <div>

                                </div>
                                <div>{media.quantity}</div>
                                <div>

                                </div>
                            </div>
                        </td>
                        <td style={{ width: "135px" }}>
                            {formatNumber(media.price*media.quantity)}
                        </td>
                        <td style={{ width: "100px" }}>
                            <div>

                            </div>
                        </td>
                    </tr>)
                }) : null
            return (
                <div key={index} className="cart-page">
                    <div className="name-page">{`Đơn hàng số ${order.id}`}</div>

                    <div className="container">
                        <div className="left-container">

                            <div className="table-container">
                                <table>
                                    <tbody>
                                        <tr className="col-name">
                                            <th>STT</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Đơn giá</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th></th>
                                        </tr>
                                        {tBody}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                        <div className="right-container">
                            <div className="cost-container">
                                <div className="cost-item">
                                    <div>Tổng giá cả</div>
                                    <div>{formatNumber(order.totalAmount)}đ</div>
                                </div>
                                <div className="cost-item">
                                    <div>VAT(10%)</div>
                                    <div>{formatNumber((order.vat * 10) / 100)}đ</div>
                                </div>
                                <div className="cost-item">
                                    <div>Tổng tiền</div>
                                    <div>{formatNumber(order.totalAmount + (order.vat * 10) / 100)}đ</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }) : null
    return (
        <div>
            <HeaderBar />
            {items}
        </div>
    );

};

export default HistoryPage;
