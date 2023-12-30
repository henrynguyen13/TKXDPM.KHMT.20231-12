import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { FaStar } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function MediaCard({ product }) {
  return (
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
                label="30%"
              />
            </span>
          </div>
        </div>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button
          size="medium"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
        >
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
}
