import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/layout/HeaderBar";
import { ProductService } from "../../services/products.service";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { FaStar } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useCart } from "../carts/CartContext";
import ToastUtil from "../../common/utils";
import { formatNumber } from "../../common/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addMediaToCart } = useCart();
  useEffect(() => {
    const getMediaDetail = async () => {
      try {
        const response = await ProductService.getMediaById(id);

        const metaDataObject = JSON.parse(response?.data?.data?.metaData);

        setProduct({
          ...response?.data?.data,
          metaData: metaDataObject,
        });
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    getMediaDetail();
  }, [id]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Tất cả sản phẩm
    </Link>,
    <Typography key="2" color="text.primary">
      {product?.title}
    </Typography>,
  ];

  const infoItems = [
    { label: "Tác giả", key: "authors" },
    { label: "Loại bìa", key: "coverType" },
    { label: "Nhà xuất bản", key: "publisher" },
    { label: "Ngày xuất bản", key: "publicationDate" },
    { label: "Số trang", key: "pages" },
    { label: "Ngôn ngữ", key: "language" },
    { label: "Thể loại", key: "genre" },
    { label: "Nghệ sĩ", key: "artists" },
    { label: "Hãng ghi âm", key: "recordLabel" },
    { label: "Danh sách bài hát", key: "trackList" },
    { label: "Loại đĩa", key: "diskType" },
    { label: "Đạo diễn", key: "director" },
    { label: "Thời lượng", key: "runTime" },
    { label: "Hãng sản xuất", key: "studio" },
    { label: "Phụ đề", key: "subtitles" },
  ];

  const getDiscountValue = (value, price) => {
    if (!value || !price) {
      return 0;
    }
    return (((value - price) * 100) / product.value).toFixed(0);
  };
  return (
    <div>
      <HeaderBar />
      {ToastUtil.initializeToastContainer()}

      <div className="container max-w-7xl mt-5">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-4">
            <img src={product?.imageUrl} alt="product" />
          </div>
          <div className="col-span-8 ml-4">
            <div className="flex justify-between ">
              <div>
                <div className="font-semibold text-2xl text-slate-700 flex items-center">
                  {product?.title}
                  <Chip
                    sx={{
                      background: "#0778db",
                      marginLeft: 3,
                      color: "#ffffff",
                      "& .MuiChip-icon": {
                        color: "#ffffff",
                      },
                    }}
                    label={product?.type}
                  />
                </div>
                <div className="flex text-amber-500 mt-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
              <div className="">
                <Button
                  size="large"
                  sx={{ textTransform: "capitalize" }}
                  variant="contained"
                  onClick={() => {
                    addMediaToCart(product);
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
            <div className="flex  items-center mt-2">
              <div className="font-semibold text-2xl text-red-500 mr-3">
                {" "}
                ₫ {formatNumber(product?.price)}
              </div>
              <span className="font-medium  line-through mr-2">
                ₫ {formatNumber(product?.value)}
              </span>
              <span className="text-red-500 font-medium">
                (Giảm {getDiscountValue(product?.value, product?.price)} % )
              </span>
            </div>
            <div className="text-green-700 font-medium">
              Còn hàng: {product?.quantityAvailable ?? 0} sản phẩm
            </div>
            <div className="mt-3 text-xl font-semibold mb-3 underline">
              Mô tả
            </div>
            <div className="mt-3 text-lg  mb-3">{product?.description}</div>
            <div className="mt-3 text-xl font-semibold mb-3 underline">
              Thông tin chi tiết
            </div>
            <table className="table table-warning table-striped">
              <thead>
                <tr>
                  <th className="min-w-[200px]">Thông tin</th>
                  <th>Nội dung</th>
                </tr>
              </thead>
              <tbody>
                {infoItems.map(
                  (item) =>
                    product?.metaData?.[item.key] && (
                      <tr key={item.key}>
                        <td>{item.label}</td>
                        <td>{product?.metaData?.[item.key]}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
