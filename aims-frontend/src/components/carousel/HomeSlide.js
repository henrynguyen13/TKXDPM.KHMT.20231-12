import HomeIcon1 from "../../assets/icons/home-icon1.svg";
import { FaSearch, FaCity } from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa6";
import Carousel from "react-material-ui-carousel";
export default function HomeSlide() {
  const items = [
    {
      name: "AIMS",
      description:
        " - Kết nối Tri thức, Nghệ thuật, và Giải trí, vì một tương lai mà không ai bị bỏ lại phía sau.",
    },
    {
      name: "AIMS",
      description:
        " - Nâng tầm tri thức, nghệ thuật và giải trí đến mọi người, vì một cuộc sống sáng tạo và phong cách, vượt qua mọi khó khăn của thời đại.",
    },
    {
      name: "AIMS",
      description: " -  Sáng tạo không giới hạn, kết nối không biên giới.",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-4 bg-[#d7e1ee] h-[630px] relative">
        <div className="col-span-5">
          <img src={HomeIcon1} alt="home-icon-1" />
        </div>
        <div className="col-span-7  mt-[100px]">
          <Carousel>
            {items.map((item, i) => (
              <div key={i}>
                <span className="font-semibold text-5xl">{item.name} </span>{" "}
                <span className="text-2xl mb-4">{item.description}</span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 absolute bottom-3 min-w-full">
        <div className="col-span-3 w-[300px] h-[150px] bg-[#5292e6] text-white rounded-2xl  flex items-center flex-wrap justify-center text-center my-0 mx-auto  font-medium text-xl">
          <span className="text-3xl min-w-full flex justify-center items-center">
            <FaSearch />
            <span className="ml-3">30.000+</span>
          </span>
          lượt truy cập
        </div>
        <div className="col-span-3 w-[300px] h-[150px]  bg-[#e69a52] text-white rounded-2xl  flex items-center flex-wrap justify-center text-center my-0 mx-auto font-medium text-xl ">
          <div className="text-3xl min-w-full flex justify-center items-center ">
            <MdOutlineSell />
            <span className="ml-3">1500+</span>
          </div>
          sản phẩm đã bán
        </div>
        <div className="col-span-3 w-[300px] h-[150px]  bg-[#e64848] text-white rounded-2xl  flex items-center flex-wrap justify-center text-center my-0 mx-auto font-medium text-xl">
          <span className="text-3xl min-w-full flex justify-center items-center">
            <FaCommentDots />
            <span className="ml-3">20.000+</span>
          </span>
          phản hồi tích cực từ khách hàng
        </div>
        <div className="col-span-3 w-[300px] h-[150px]  bg-[#2aa94c] text-white rounded-2xl  flex items-center flex-wrap justify-center text-center my-0 mx-auto font-medium text-xl">
          <span className="text-3xl min-w-full flex justify-center items-center">
            <FaCity />
            <span className="ml-3">60+</span>
          </span>
          tỉnh/thành phố đã đến
        </div>
      </div>
    </>
  );
}
