import styles from "./Footer.module.css";
import * as React from "react";
import logo from "../../assets/icons/logo.svg";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { HiMapPin } from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className=" container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <img className={styles["footer-img"]} src={logo} alt="" />
              <br />
              <div className={styles["footer-icon"]}>
                <a
                  href="https://www.facebook.com/bincoln13/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/khoand.1301/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/channel/UChqJvoQilbLeqUin3LMNJQg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.tiktok.com/@bincoln13"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <ul>
                <div className={styles["footer-title"]}>Về chúng tôi</div>
                <li className={styles["footer-desc"]}>Giới thiệu</li>
                <li className={styles["footer-desc"]}>Tài khoản ngân hàng </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <ul>
                <div className={styles["footer-title"]}>Sản phẩm</div>
                <li className={styles["footer-desc"]}>Sách quyển</li>
                <li className={styles["footer-desc"]}>Đĩa CD</li>
                <li className={styles["footer-desc"]}>Đĩa than LP </li>
                <li className={styles["footer-desc"]}>Đĩa DVD </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <ul>
                <div className={styles["footer-title"]}>Liên hệ</div>
                <li className={styles["footer-desc"]}>
                  <div className="flex items-center">
                    <MdEmail className="mr-2" />
                    <a href="mailto: aims@gmail.com">aims@gmail.com</a>
                  </div>
                </li>
                <li className={styles["footer-desc"]}>
                  <div className="flex items-center">
                    <FaPhone className="mr-2" />
                    <a href="tel:0978014692">0966.669.966</a>
                  </div>
                </li>
                <li className={styles["footer-desc"]}>
                  <div className="flex items-center">
                    <HiMapPin className="mr-2" /> 1 Đại Cồ Việt, Hai Bà Trưng,
                    Hà Nội
                  </div>
                </li>
              </ul>
              <div className="text-white">
                <a
                  className={styles["footer-map"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/place/1+%C4%90%E1%BA%A1i+C%E1%BB%93+Vi%E1%BB%87t,+B%C3%A1ch+Khoa,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i,+Vietnam/@21.0074229,105.8399398,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab8a922653a9:0x6c2ec19683313eab!8m2!3d21.0074229!4d105.8425147!16s%2Fg%2F11gfjt79ty?entry=ttu"
                >
                  Xem bản đồ
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className={`${styles["copy-right"]} container flex items-center`}>
          Bản quyền <FaRegCopyright /> 2023 Aims Inc. Bảo lưu mọi bản quyền.
        </p>
      </div>
    </>
  );
}

export default Footer;
