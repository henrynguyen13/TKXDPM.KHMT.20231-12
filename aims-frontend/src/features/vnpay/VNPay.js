import { useEffect, useState } from 'react';
import HeaderBar from '../../components/layout/HeaderBar';
import './PaymentPage.css';
import { PaymentService } from '../../services/payment.service';
import Iframe from 'react-iframe';

const PaymentPage = () => {

    const [urlPayment, setUrlPayment] = useState('');
    const totalPrice = 1000000;

    const getUrlPayment = async () => {
        try {
          const response = await PaymentService.getPayUrl(totalPrice);
          setUrlPayment(response.data.data);
        } catch (err) {
          console.error("Error:", err);
        }
    };

    useEffect(() => {
        getUrlPayment();
    }, [])

    return (
        <>
        <HeaderBar />
        <div className='payment-page'>
            <div className='name-page'>Thanh toán đơn hàng</div>
            { urlPayment !== '' && (
            <div className='payment-container'>
                <Iframe
                    url={urlPayment}
                    width='70%'
                    height='500px'
                    id='paymentIframe'
                    className='payment-iframe'
                    display='initial'
                />
            </div>
            )}
        </div>
        </>
    );
};

export default PaymentPage;