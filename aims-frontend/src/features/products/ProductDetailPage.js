import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderBar from "../../components/layout/HeaderBar";
import { ProductService } from "../../services/products.service";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const getMediaDetail = async () => {
      try {
        const response = await ProductService.getMediaById(id);
        console.log("response", response);
        setProduct(response?.data?.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    getMediaDetail();
  }, []);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Tất cả sản phẩm
    </Link>,
    <Typography key="2" color="text.primary">
      {product?.title}
    </Typography>,
  ];

  return (
    <div>
      <HeaderBar />

      <div className="container max-w-6xl mt-5">
        <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-5">
            <img src={product?.imageUrl} alt="product" />
          </div>
          <div className="col-span-7 ">
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
            <div className="flex  items-center mt-2">
              <div className="font-semibold text-2xl text-red-500 mr-3">
                {" "}
                ₫ {product.price}
              </div>
              <span className="font-medium  line-through">
                ₫ {product.value}
              </span>
            </div>
            <div>Thông tin chi tiết</div>
            {/* book */}
            {product?.metaData?.authors ? (
              <div>Tác giả: {product?.metaData?.authors} </div>
            ) : null}
            {product?.metaData?.authors ? (
              <div>Loại bìa: {product?.metaData?.coverType} </div>
            ) : null}
            {product?.metaData?.publisher ? (
              <div>Nhà xuất bản: {product?.metaData?.publisher} </div>
            ) : null}
            {product?.metaData?.publicationDate ? (
              <div>Ngày xuất bản: {product?.metaData?.publicationDate} </div>
            ) : null}
            {product?.metaData?.pages ? (
              <div>Số trang: {product?.metaData?.pages} </div>
            ) : null}
            {product?.metaData?.language ? (
              <div>Ngôn ngữ: {product?.metaData?.language} </div>
            ) : null}
            {product?.metaData?.genre ? (
              <div>Thể loại: {product?.metaData?.genre} </div>
            ) : null}
            {/* CD */}
            {product?.metaData?.artists ? (
              <div>Nghệ sĩ: {product?.metaData?.artists} </div>
            ) : null}
            {product?.metaData?.recordLabel ? (
              <div>Hãng ghi âm: {product?.metaData?.recordLabel} </div>
            ) : null}
            {product?.metaData?.trackList ? (
              <div>Danh sách bài hát: {product?.metaData?.trackList} </div>
            ) : null}
            {/* dvd */}
            {product?.metaData?.diskType ? (
              <div>Loại đĩa: {product?.metaData?.diskType} </div>
            ) : null}
            {product?.metaData?.director ? (
              <div>Đạo diễn: {product?.metaData?.director} </div>
            ) : null}
            {product?.metaData?.runTime ? (
              <div>Thời lượng: {product?.metaData?.runTime} </div>
            ) : null}
            {product?.metaData?.studio ? (
              <div>Hãng sản xuất: {product?.metaData?.studio} </div>
            ) : null}
            {product?.metaData?.subtitles ? (
              <div>Phụ đề: {product?.metaData?.subtitles} </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
