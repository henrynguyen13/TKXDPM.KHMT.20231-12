import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { FaStar } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/products.service";
import { CartService } from "../../services/cart.service";
import ToastUtil from "../../common/utils";
import { useNumProduct } from "../../features/carts/NumProductInCartContext";
import { useEffect, useState } from "react";
export default function MediaCard({ product }) {
  const { updateNumProduct, numProduct } = useNumProduct();
  const [medias, setMedias] = useState();
  useEffect(() => {
    const getMediasInCart = async () => {
      const res = await CartService.getAllMediaInCart();
      setMedias(res?.data);
    };
    getMediasInCart();
  }, []);
  const addMediaToCart = async () => {
    console.log("hi", medias.find((r) => r?.mediaId === product?.id).quantity);
    if (
      medias.find((r) => r?.mediaId === product?.id).quantity >=
      product.quantityAvailable
    ) {
      ToastUtil.showToastError(
        `Không thể thêm do số lượng hàng tồn trong kho của sản phẩm ${product.title} không đủ: ${product.quantityAvailable}`
      );
      return;
    } else {
      const response = await ProductService.addMediaToCart("1", product?.id, 1);
      if (response?.data?.message === "Success") {
        updateNumProduct(numProduct + 1);
        ToastUtil.showToastSuccess("Thành công!");
      }
    }
  };
  return (
    <>
      {ToastUtil.initializeToastContainer()}
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`products/${product.id}`}>
          <CardMedia sx={{ height: 300 }} image={product.imageUrl} />
        </Link>

        <CardContent>
          <div className="font-semibold text-xl">{product.title}</div>
          <div className="flex text-amber-500 mt-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="font-semibold text-2xl text-red-500">
              {" "}
              ₫ {product.price}
            </div>
            <div className="font-medium ">
              <span className="line-through">₫ {product.value}</span>
              <span>
                {" "}
                <Chip
                  sx={{
                    background: "red",
                    color: "#ffffff",
                    "& .MuiChip-icon": {
                      color: "#ffffff",
                    },
                  }}
                  icon={<AiFillThunderbolt />}
                  label={
                    (
                      ((product.value - product.price) * 100) /
                      product.value
                    ).toFixed(0) + "%"
                  }
                />
              </span>
            </div>
          </div>
          <div>Có sẵn: {product?.quantityAvailable ?? 0}</div>
        </CardContent>
        <CardActions sx={{ float: "right" }}>
          <Button
            size="medium"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            onClick={() => {
              addMediaToCart();
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
