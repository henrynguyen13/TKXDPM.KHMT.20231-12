import React from 'react';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import book1 from "../../assets/images/book1.jpg";
import book2 from "../../assets/images/book2.jpg";
import book3 from "../../assets/images/book3.jpg";
import HeaderBar from '../../components/layout/HeaderBar';
import { getInvoiceById } from '../../APIs/InvoiceAPIs';
import {  getAllMediaAPI } from '../../APIs/MediaAPIs';

// const customerInfo = {
//   name: 'John Doe',
//   phone: '123-456-7890',
//   city: 'Cityville',
//   address: '123 Main Street',
//   shippingInstructions: 'Handle with care',
// };

// const imageUrls = {
//   book1: book1,
//   book2: book2,
//   book3: book3,
// };

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

  const [shipping, setShipping] = useState();
  let [res, setRes] = useState({});
  let [medias,setListMedias] = useState([]);
  useEffect(() => {
    getInvoiceById(1).then((res) => {
      setRes(res)
    });
    getAllMediaAPI().then((res)=>{
      setListMedias(res)
    })
  }, []);

  const subtotal = productInfo.reduce((totals, product) => totals + product.unitprice * product.quantity, 0);
  const shippingFees = 0.1 * subtotal;
  const total = subtotal + shippingFees;

  let mediasToShow = medias&&medias.length>0?
  medias.map((media,index)=>{
    return(
      <Grid container item xs={12} key={index}>
                  <Grid item xs={3}>
                    <img src={media.imageUrl} alt={media.title} style={{ maxWidth: '100%' }} />
                  </Grid>
                  <Grid item xs={5} pl={3}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{media.title}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>x SL</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Unit Price: {media.price} đ</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Price: XX đ</Typography>
                  </Grid>
                </Grid>
    )
  }):null

  return (
    <div>
      <HeaderBar />
      <Box mt={5} pl={5}>
        <Typography variant='h4' color={'#209ed4'} >INVOICE</Typography>
      </Box>
      <Grid mt={5} container>
        <Grid item xs={1} pl={3}></Grid>
        <Grid item xs={2} pl={3} pt={3} sx={{ backgroundColor: '#e7e7e7', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Name: </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Phone: </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>City: </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Address: </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>Shipping Instructions: </Typography>
        </Grid>
        <Grid item xs={3} pl={3} pt={3} sx={{ backgroundColor: '#e7e7e7', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>{res?.orderShipping?.name || ""} </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>{res?.orderShipping?.phone || ""} </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>{res?.orderShipping?.city || ""} </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>{res?.orderShipping?.address || ""} </Typography>
          <Typography variant="body1" pb={5} sx={{ fontWeight: 'bold' }}>{res?.orderShipping?.shippingInstruction || ""} </Typography>
        </Grid>
        <Grid item xs={5} pl={3} pt={2} container alignItems="center" sx={{ maxHeight: '350px', overflow: 'auto', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
          <Grid container spacing={2}>
            {mediasToShow}
          </Grid>
        </Grid>
        <Grid item xs={1} pl={3}></Grid>
      </Grid>

      <Box display="flex" flexDirection="column" alignItems="center" mt={5} pb={5}>
        <Grid container>
          <Grid xs={5}></Grid>
          <Grid xs={2}>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Subtotal:</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Shipping Fees:</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>Total:</Typography>
          </Grid>
          <Grid xs={2}>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>{subtotal} đ</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>{shippingFees} đ</Typography>
            <Typography variant="body1" sx={{ width: '250px', textAlign: 'left', fontWeight: 'bold' }}>{total} đ</Typography>
          </Grid>
          <Grid xs={3}></Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button sx={{ backgroundColor: '#209ed4', color: 'white', borderRadius: '10px' }}>
          <Typography>Confirm order</Typography>
        </Button>
      </Box>

    </div>
  );
};

export default InvoicePage;