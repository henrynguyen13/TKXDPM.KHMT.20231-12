import MediaCard from "../../components/base/MediaCard";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
    setProducts([
      {
        id: "1",
        name: "DVD Nhà Bà Nữ",
        price: "172000",
        image:
          "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
        type: "dvd",
      },
      {
        id: "2",
        name: "CD Nhà Bà Nữ",
        price: "202000",
        image:
          "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
        type: "cd",
      },
      {
        id: "3",
        name: "LP Nhà Bà Nữ",
        price: "192000",
        image:
          "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
        type: "lp",
      },
      {
        id: "4",
        name: "Book Nhà Bà Nữ",
        price: "182000",
        image:
          "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
        type: "book",
      },
    ]);
  }, []);
  //   const fakeproducts = [
  //     {
  //       id: "1",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //       type: "dvd",
  //     },
  //     {
  //       id: "2",
  //       name: "CD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //       type: "cd",
  //     },
  //     {
  //       id: "3",
  //       name: "LP Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //       type: "lp",
  //     },
  //     {
  //       id: "4",
  //       name: "Book Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //       type: "book",
  //     },
  //     {
  //       id: "5",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "6",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "7",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "8",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "9",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "10",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },

  //     {
  //       id: "11",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "12",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "13",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "14",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "15",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "16",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "17",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "18",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "19",
  //       name: "hiiiiii",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "20",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "21",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },

  //     {
  //       id: "22",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //     {
  //       id: "23",
  //       name: "DVD Nhà Bà Nữ",
  //       price: "172000",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/vi/6/6f/%C3%81p_ph%C3%ADch_phim_Nh%C3%A0_b%C3%A0_N%E1%BB%AF.jpg",
  //     },
  //   ];

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
          <div>Danh sách sản phẩm ({filterProducts.length})</div>
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
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((product, index) => (
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
            count={Math.ceil(products.length / 20)}
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
