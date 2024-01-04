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
                    <a href="mailto: selectronic@gmail.com">
                      selectronic@gmail.com
                    </a>
                  </div>
                </li>
                <li className={styles["footer-desc"]}>
                  <div className="flex items-center">
                    <FaPhone className="mr-2" />
                    <a href="tel:0978014692">0978.014.692</a>
                  </div>
                </li>
                <li className={styles["footer-desc"]}>
                  <div className="flex items-center">
                    <HiMapPin className="mr-2" /> 121 Kim Ngưu, Quận Hai Bà
                    Trưng, Thành phố Hà Nội
                  </div>
                </li>
              </ul>
              <div className="text-white">
                <a
                  className={styles["footer-map"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/place/121+P.+Kim+Ng%C6%B0u,+Thanh+L%C6%B0%C6%A1ng,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i,+Vietnam/@21.0068514,105.8589204,17z/data=!3m1!4b1!4m6!3m5!1s0x3135abf7d314a99f:0x3b79ab1889b035e!8m2!3d21.0068514!4d105.8614953!16s%2Fg%2F11cs7v50hz?entry=ttu"
                >
                  Xem bản đồ
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className={`${styles["copy-right"]} container flex items-center`}>
          Bản quyền <FaRegCopyright /> 2023 Selectronic Inc. Bảo lưu mọi bản
          quyền.
        </p>
      </div>
    </>
  );
}

export default Footer;
