import HeaderBar from '../../components/layout/HeaderBar';
import './PaymentPage.css';

const PaymentPage = () => {
    return (
        <>
        <HeaderBar />
        <div className='payment-page'>
            <div className='name-page'>Thanh toán đơn hàng</div>
        </div>
        </>
    );
};

export default PaymentPage;