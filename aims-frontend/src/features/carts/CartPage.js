import './CartPage.css';
import HeaderBar from '../../components/layout/HeaderBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {

    const [numProduct, setNumProduct] = useState(4);

    const handleOrder = () => {
        if (numProduct === 0) {
            toast.error("Không thể đặt hàng do giỏ hàng không có sản phẩm nào", {
                position: toast.POSITION.BOTTOM_RIGHT,
                containerId: 'cartToast',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                closeButton: false,
                theme: 'colored',
            });
            return;
        }
    };

    return (
        <>
            <HeaderBar />
            <ToastContainer containerId="cartToast" autoClose={3000} limit={1}/>
            <div className='cart-page'>
                <div className='name-page'>Giỏ hàng của bạn</div>
                <div className='num-products-text'>Tổng số <span className='num-products'>{numProduct} sản phẩm</span></div>
                <div className='container'>
                    <div className='left-container'>                        
                        <div className='table-container'>
                            <table>
                                <tbody>
                                    <tr className='col-name'>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Đơn giá(VNĐ)</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                        <th></th>
                                    </tr>
                                    <tr className='record'> 
                                        <td>1</td>
                                        <td style={{ width: '450px' }}>
                                            <div className='product'>
                                                <div className='product-image'>
                                                    <img src='https://vb.1cdn.vn/2022/12/03/nbn_teaser-poster_fb.jpg' alt='product' />
                                                </div>
                                                <div className='product-name'>DVD Nhà Bà Nữ</div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td>
                                            <div className='quantity'>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faMinus} /></div>
                                                <div>1</div>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faPlus} /></div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td style={{ width: '100px' }}>
                                            <div><FontAwesomeIcon className='icon-delete' icon={faTrashCan} /></div>
                                        </td>
                                    </tr>
                                    <tr className='record'> 
                                        <td>2</td>
                                        <td style={{ width: '450px' }}>
                                            <div className='product'>
                                                <div className='product-image'>
                                                    <img src='https://vb.1cdn.vn/2022/12/03/nbn_teaser-poster_fb.jpg' alt='product' />
                                                </div>
                                                <div className='product-name'>DVD Nhà Bà Nữ</div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td>
                                            <div className='quantity'>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faMinus} /></div>
                                                <div>1</div>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faPlus} /></div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td style={{ width: '100px' }}>
                                            <div><FontAwesomeIcon className='icon-delete' icon={faTrashCan} /></div>
                                        </td>
                                    </tr>
                                    <tr className='record'> 
                                        <td>3</td>
                                        <td style={{ width: '450px' }}>
                                            <div className='product'>
                                                <div className='product-image'>
                                                    <img src='https://vb.1cdn.vn/2022/12/03/nbn_teaser-poster_fb.jpg' alt='product' />
                                                </div>
                                                <div className='product-name'>DVD Nhà Bà Nữ</div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td>
                                            <div className='quantity'>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faMinus} /></div>
                                                <div>1</div>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faPlus} /></div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td style={{ width: '100px' }}>
                                            <div><FontAwesomeIcon className='icon-delete' icon={faTrashCan} /></div>
                                        </td>
                                    </tr>
                                    <tr className='record'> 
                                        <td>4</td>
                                        <td style={{ width: '450px' }}>
                                            <div className='product'>
                                                <div className='product-image'>
                                                    <img src='https://vb.1cdn.vn/2022/12/03/nbn_teaser-poster_fb.jpg' alt='product' />
                                                </div>
                                                <div className='product-name'>DVD Nhà Bà Nữ</div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td>
                                            <div className='quantity'>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faMinus} /></div>
                                                <div>1</div>
                                                <div><FontAwesomeIcon className='icon-quantity' icon={faPlus} /></div>
                                            </div>
                                        </td>
                                        <td style={{ width: '135px' }}>172.000</td>
                                        <td style={{ width: '100px' }}>
                                            <div><FontAwesomeIcon className='icon-delete' icon={faTrashCan} /></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className='cost-container'>
                            <div className='cost-item'>
                                <div>Tổng giá cả</div>
                                <div>680.000đ</div>
                            </div>
                            <div className='cost-item'>
                                <div>VAT</div>
                                <div>10%</div>
                            </div>
                            <div className='cost-item'>
                                <div>Tổng tiền</div>
                                <div>748.000đ</div>
                            </div>
                        </div>
                        <div className='order-btn' onClick={handleOrder}>Đặt hàng</div>
                    </div>
                </div>
            </div>
            </>
    );
};

export default CartPage;