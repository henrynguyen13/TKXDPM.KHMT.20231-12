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
import TextField from "@mui/material/TextField";
import { IoSearchSharp } from "react-icons/io5";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
export default function ProductPage() {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const handleChangeCategory = async (event: SelectChangeEvent) => {
    setCategory(event.target.value);

    if (event.target.value === "") {
      const response = await ProductService.getAllMedia(20, 1);
      setProducts(response?.data?.data?.content);
    } else {
      const response = await ProductService.getAllMedia(
        20,
        1,
        null,
        event.target.value
      );

      setProducts(response?.data?.data?.content);
    }
  };
  const handleChangeFilter = async (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    const response = await ProductService.getAllMedia(
      20,
      1,
      null,
      null,
      event.target.value
    );
    setProducts(response?.data?.data?.content);
  };
  const handlePageChange = async (event, newPage) => {
    setCurrentPage(newPage - 1);

    const response = await ProductService.getAllMedia(20, newPage);
    setProducts(response?.data?.data?.content);
  };
  const handleSearch = async () => {
    const response = await ProductService.getAllMedia(20, 1, search);
    setProducts(response?.data?.data?.content);
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
    const getTotalMedias = async () => {
      const response = await ProductService.getAllMedia(50, 1);
      setTotal(response?.data?.data?.content.length);
    };
    getTotalMedias();
    getMedia();
  }, []);

  return (
    <>
      <div className="bg-[#ede5e5]">
        <div className=" pt-20 text-center text-3xl uppercase font-medium mb-10 flex justify-evenly items-center ">
          <div className="flex">
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 200,
              }}
            >
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
            </Paper>
            <div className="mr-2"></div>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 220,
              }}
            >
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                  <InputLabel id="filter">Sắp xếp theo</InputLabel>
                  <Select
                    labelId="filter"
                    id="filter"
                    value={filter}
                    label="Sắp xếp theo"
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value="desc">Từ cao xuống thấp</MenuItem>
                    <MenuItem value="asc">Từ thấp đến cao</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </div>
          <div>Danh sách sản phẩm ({total})</div>

          <div>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        {products.length ? (
          <div className="grid grid-cols-12 gap-4 ">
            {products?.map((product, index) => (
              <div
                key={product.id}
                className="col-span-3 mx-auto my-0 min-w-[300px]"
              >
                <MediaCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Không có sản phẩm nào</div>
        )}

        <div className="flex justify-center py-6">
          <Pagination
            count={Math.ceil(total / 20)}
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
