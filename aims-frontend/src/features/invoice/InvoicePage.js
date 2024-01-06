import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import book1 from "../../assets/images/book1.jpg";
import book2 from "../../assets/images/book2.jpg";
import book3 from "../../assets/images/book3.jpg";
import { PaymentService } from "../../services/payment.service";
import HeaderBar from "../../components/layout/HeaderBar";
import { getInvoiceById } from "../../APIs/InvoiceAPIs";
import { getAllMediaAPI } from "../../APIs/MediaAPIs";
import { useParams } from "react-router-dom";
import { OrderService } from "../../services/order.service";
const productInfo = [
  {
    name: "Book 1",
    quantity: 2,
    unitprice: 50000,
  },
  {
    name: "Book 2",
    quantity: 1,
    unitprice: 30000,
  },
  {
    name: "Book 3",
    quantity: 3,
    unitprice: 60000,
  },
];

const InvoicePage = () => {
  const { orderId } = useParams();
  const [shipping, setShipping] = useState();
  let [res, setRes] = useState({});
  let [medias, setListMedias] = useState([]);
  useEffect(() => {
    console.log("id", orderId);
    const getOrderById = async () => {
      const response = await OrderService.getOrderById(orderId);
      console.log("-------", response);
      setRes(response?.data?.data);
      setShipping(response?.data?.data?.order);
    };
    getOrderById();
  }, []);

  const subtotal = productInfo.reduce(
    (totals, product) => totals + product.unitprice * product.quantity,
    0
  );
  const shippingFees = 0.1 * subtotal;
  const total = subtotal + shippingFees;

  let mediasToShow =
    medias && medias.length > 0
      ? medias.map((media, index) => {
          return (
            <Grid container item xs={12} key={index}>
              <Grid item xs={3}>
                <img
                  src={media.imageUrl}
                  alt={media.title}
                  style={{ maxWidth: "100%" }}
                />
              </Grid>
              <Grid item xs={5} pl={3}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {media.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  x SL
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Unit Price: {media.price} đ
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Price: XX đ
                </Typography>
              </Grid>
            </Grid>
          );
        })
      : null;

  return (
    <div>
      <HeaderBar />
      <Box mt={5} pl={5}>
        <Typography
          variant="h4"
          sx={{ marginLeft: 11, fontWeight: 600 }}
          color={"#209ed4"}
        >
          Hóa đơn
        </Typography>
      </Box>
      <Grid mt={5} container>
        <Grid item xs={1} pl={3}></Grid>
        <Grid
          item
          xs={2}
          pl={3}
          pt={3}
          sx={{
            backgroundColor: "#e7e7e7",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          {res?.orderShipping?.name ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Họ và tên:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.phone ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Số điện thoại:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.city ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Tỉnh/Thành phố:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.address ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Địa chỉ:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shippingInstruction ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Chỉ dẫn giao hàng:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shippingMethod ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Phương thức giao hàng:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shipmentDetails ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Thông tin giao hàng nhanh:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.deliveryInstruction ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Chỉ dẫn giao hàng nhanh:{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.deliveryTime ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              Thời gian nhận hàng:{" "}
            </Typography>
          ) : null}
        </Grid>
        <Grid
          item
          xs={3}
          pl={3}
          pt={3}
          sx={{
            backgroundColor: "#e7e7e7",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          {res?.orderShipping?.name ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.name || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.phone ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.phone || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.city ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.city || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.address ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.address || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shippingInstruction ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.shippingInstruction || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shippingMethod ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.shippingMethod || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.shipmentDetails ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.shipmentDetails || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.deliveryInstruction ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.deliveryInstruction || ""}{" "}
            </Typography>
          ) : null}
          {res?.orderShipping?.deliveryTime ? (
            <Typography variant="body1" pb={5} sx={{ fontWeight: "bold" }}>
              {res?.orderShipping?.deliveryTime || ""}{" "}
            </Typography>
          ) : null}
        </Grid>
        <Grid
          item
          xs={5}
          pl={3}
          pt={2}
          container
          alignItems="center"
          sx={{
            maxHeight: "350px",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            {mediasToShow}
          </Grid>
        </Grid>
        <Grid item xs={1} pl={3}></Grid>
      </Grid>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={5}
        pb={5}
      >
        <Grid container>
          <Grid xs={5}></Grid>
          <Grid xs={2}>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              Subtotal:
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              VAT(10%):
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              Shipping Fees:
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              Total:
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              {shipping?.originPrice} đ
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              {(shipping?.originPrice * 10) / 100} đ
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              {shipping?.shippingFee} đ
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "left", fontWeight: "bold" }}
            >
              {shipping?.totalAmount} đ
            </Typography>
          </Grid>
          <Grid xs={3}></Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" sx={{ margin: 2 }}>
        <Button
          sx={{
            backgroundColor: "#209ed4",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <Typography>Xác nhận thanh toán</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default InvoicePage;
