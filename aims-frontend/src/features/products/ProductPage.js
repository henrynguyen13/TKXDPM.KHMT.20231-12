import MediaCard from "../../components/base/MediaCard";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProductService } from "../../services/products.service";
export default function ProductPage() {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1);
  };
  useEffect(() => {
    const getMedia = async () => {
      try {
        const response = await ProductService.getAllMedia(20, 1);
        console.log("response", response);
        setProducts(response?.data?.data?.content);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    getMedia();
  }, []);

  const filterProducts = category
    ? products.filter((product) => product.type === category)
    : filter
    ? products.sort((a, b) =>
        filter === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price)
      )
    : products;
  return (
    <>
      <div className="bg-[#ede5e5]">
        <div className=" pt-20 text-center text-3xl uppercase font-medium mb-10 flex justify-evenly items-center ">
          <div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="category">Loại sản phẩm</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={category}
                  label="Loại sản phẩm"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="book">Sách quyển</MenuItem>
                  <MenuItem value="cd">Đĩa CD</MenuItem>
                  <MenuItem value="lp">Đĩa than LP</MenuItem>
                  <MenuItem value="dvd">Đĩa DVD</MenuItem>
                  <MenuItem value="">Tất cả</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>Danh sách sản phẩm ({filterProducts?.length})</div>
          <div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="filter">Sắp xếp theo</InputLabel>
                <Select
                  labelId="filter"
                  id="filter"
                  value={filter}
                  label="Sắp xếp theo"
                  onChange={handleChangeFilter}
                >
                  <MenuItem value="des">Từ cao xuống thấp</MenuItem>
                  <MenuItem value="asc">Từ thấp đến cao</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 ">
          {filterProducts
            ?.slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage
            )
            ?.map((product, index) => (
              <div
                key={product.id}
                className="col-span-3 mx-auto my-0 min-w-[300px]"
              >
                <MediaCard product={product} />
              </div>
            ))}
        </div>
        <div className="flex justify-center py-6">
          <Pagination
            count={Math.ceil(products?.length ? products.length / 20 : 1)}
            color="primary"
            size="large"
            defaultChecked={true}
            defaultPage={1}
            page={currentPage + 1}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
