import HeaderBar from '../../components/layout/HeaderBar';
import './ResultPage.css';
import SuccessIcon from '../../assets/images/successIcon.png';
import { useLocation } from 'react-router-dom';
import { formatNumber } from '../../common/utils';
import { CartService } from '../../services/cart.service';
import { useEffect } from 'react';
import { useNumProduct } from '../carts/NumProductInCartContext';

const ResultPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const vnp_TransactionNo = queryParams.get('vnp_TransactionNo');
    const vnp_Amount = queryParams.get('vnp_Amount');
    const vnp_OrderInfo = queryParams.get('vnp_OrderInfo');
    const vnp_PayDate = queryParams.get('vnp_PayDate');

    const { updateNumProduct } = useNumProduct();

    const deleteCart = async () => {
        try {
          await CartService.deleteCart();
        } catch (err) {
          console.error("Error:", err);
        }
    };

    useEffect(() => {
        updateNumProduct(0);
        deleteCart();  
    }, []);

    return (
        <>
            <HeaderBar />
            <div className='result-page'>
                <div className="name-page">Kết quả thanh toán đơn hàng</div>
                <div className='result-payment-box'>
                    <div><img src={SuccessIcon} alt='' /></div>
                    <div className='result-text'>Bạn đã thanh toán thành công</div>
                    <div className='payment-info'>
                        <div className='info-item'>
                            <div>Mã giao dịch:</div>
                            <div>{vnp_TransactionNo}</div>
                        </div>
                        <div className='info-item'>
                            <div>Số tiền giao dịch:</div>
                            <div>{formatNumber(parseInt(vnp_Amount) / 100)} VND</div>
                        </div>
                        <div className='info-item'>
                            <div>Nội dung giao dịch</div>
                            <div>{vnp_OrderInfo}</div>
                        </div>
                        <div className='info-item'>
                            <div>Thời gian giao dịch:</div>
                            <div>{vnp_PayDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultPage;