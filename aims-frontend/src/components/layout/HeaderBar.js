import logo from "../../assets/icons/logo.svg";
import avatar from "../../assets/images/avatar.jpg";
import Icon from "@mdi/react";
import { mdiCartOutline } from "@mdi/js";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
export default function HeaderBar() {
  return (
    <div className="">
      <div className="font-semibold text-white h-16 bg-[#209ED4] flex items-center justify-between px-3 ">
        <img src={logo} alt="" className="h-[50px] cursor-pointer" />
        <div className="flex items-center">
          <ul className="flex mr-5 text-lg">
            <li className="cursor-pointer p-3">Trang chủ</li>
            <li className="cursor-pointer p-3">Sản phẩm </li>
            <li className="cursor-pointer p-3">Về chúng tôi</li>
            <li className="cursor-pointer p-3">Liên hệ</li>
          </ul>
          <Badge
            badgeContent={4}
            color="error"
            className="cursor-pointer hover:opacity-90"
          >
            <Icon path={mdiCartOutline} size={1.2} />
          </Badge>
          <Avatar
            alt="avatar"
            className="ml-8 cursor-pointer"
            src={avatar}
            sx={{ width: 50, height: 50 }}
          />
        </div>
      </div>
    </div>
  );
}
