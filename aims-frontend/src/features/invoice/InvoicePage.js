import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import book1 from "../../assets/images/book1.jpg";
import book2 from "../../assets/images/book2.jpg";
import book3 from "../../assets/images/book3.jpg";
import { PaymentService } from '../../services/payment.service';
import { useEffect, useState } from 'react';

const customerInfo = {
  name: 'John Doe',
  phone: '123-456-7890',
  city: 'Cityville',
  address: '123 Main Street',
  shippingInstructions: 'Handle with care',
};

const imageUrls = {
  book1: book1,
  book2: book2,
  book3: book3,
};

const productInfo = [
  {
    name: 'Book 1',
    quantity: 2,
    unitprice: 50000,
  },
  {
    name: 'Book 2',
    quantity: 1,
    unitprice: 30000,
  },
  {
    name: 'Book 3',
    quantity: 3,
    unitprice: 60000,
  },
];


const InvoicePage = () => {

  const subtotal = productInfo.reduce((totals, product) => totals + product.unitprice * product.quantity, 0);
  const shippingFees = 0.1 * subtotal;
  const total = subtotal + shippingFees;

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
    <div>
      <Box mt={5} pl={5}>
        <Typography variant='h3' sx={{ color: 'blue' }}>INVOICE</Typography>
      </Box>
      <Grid mt = {5} container>
        <Grid item xs={2} pl ={3}>
            <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Name: </Typography>
            <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Phone: </Typography>
            <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>City: </Typography>
            <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Address: </Typography>
            <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Shipping Instructions: </Typography>
        </Grid>
        <Grid item xs={4} pl = {3}>
          <Typography variant="body1" pb={5}>{customerInfo.name} </Typography>
          <Typography variant="body1" pb={5}>{customerInfo.phone} </Typography>
          <Typography variant="body1" pb={5}>{customerInfo.city} </Typography>
          <Typography variant="body1" pb={5}>{customerInfo.address} </Typography>
          <Typography variant="body1" pb={5}>{customerInfo.shippingInstructions} </Typography>
        </Grid>
        <Grid item xs={6} pl={3} container alignItems="center" sx={{ maxHeight: '350px', overflow: 'auto' }}>
          <Grid container spacing={2}>
            {productInfo.map((product, index) => (
              <Grid container item xs={12} key={index}>
                <Grid item xs={3}>
                  <img src={imageUrls[`book${index + 1}`]} alt={`Book${index + 1}`} style={{ maxWidth: '100%' }} />
                </Grid>
                <Grid item xs={5} pl={3}>
                  <Typography variant="body1" sx={{ color: 'blue' }}>{product.name}</Typography>
                  <Typography variant="body1">x {product.quantity}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ color: 'blue' }}>Unit Price: {product.unitprice} đ</Typography>
                  <Typography variant="body1" sx={{ color: 'blue' }}>Price: {product.unitprice * product.quantity} đ</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box display="flex" flexDirection="column" alignItems="center" mt={5} pb={5}>
        <Grid container>
          <Grid xs = {5}></Grid>
          <Grid xs = {2}>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Subtotal:</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Shipping Fees:</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Total:</Typography>
          </Grid>
          <Grid xs = {2}>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left'}}>{subtotal} đ</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left'}}>{shippingFees} đ</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', color: 'red' }}>{total} đ</Typography>
          </Grid>
          <Grid xs = {3}></Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button onClick={() => { if (urlPayment !== '') window.location.assign(`${urlPayment}`) }} sx={{ backgroundColor: 'blue', color: 'white' }}>
          <Typography>Confirm order</Typography>
        </Button>
      </Box>

    </div>
  );
};

export default InvoicePage;