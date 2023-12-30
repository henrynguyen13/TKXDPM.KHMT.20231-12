import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import book1 from "../../assets/images/book1.jpg";
import book2 from "../../assets/images/book2.jpg";
import book3 from "../../assets/images/book3.jpg";

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

const HistoryPage = () => {

    return(
        <div>
            <Box mt={5} pl={5} sx={{ textAlign: 'center' }}>
                <Typography variant='h3' sx={{color: 'blue' }}>HISTORY</Typography>
            </Box>
            <Grid mt = {5} container>
                <Grid xs = {3}></Grid>
                <Grid item xs={9} pl={3} container alignItems="center" sx={{ maxHeight: '500px', overflow: 'auto' }}>
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
        </div>
    );

};

export default HistoryPage;
