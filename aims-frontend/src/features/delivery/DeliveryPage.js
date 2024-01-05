import "./DeliveryPage.css";
import React, { useEffect } from "react";
import HeaderBar from "../../components/layout/HeaderBar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCart } from "../carts/CartContext";
import { formatNumber } from "../../common/utils";
import { OrderService } from "../../services/order.service";
import ToastUtil from "../../common/utils";
import { useNavigate } from "react-router-dom";

export default function DeliveryPage() {
  const { subtotal, listMedia } = useCart();
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const request = {
        orderShipping: {
          name: data?.name ?? "",
          phone: data?.phone ?? "",
          city: data?.city ?? "",
          address: data?.address ?? "",
          shippingInstruction: data?.shippingInstruction ?? "",
          shippingMethod: selectedShippingMethod,
          shipmentDetails: data?.shipmentDetails ?? "",
          deliveryInstruction: data?.deliveryInstruction ?? "",
          deliveryTime: data?.deliveryTime ?? "",
        },
        medias: listMedia,
        shippingFee: shippingFee,
        userId: "1",
      };
      const response = await OrderService.createOrder(request);
      console.log("---------", response);
      if (response?.data?.data === "Success") {
        navigate("/invoice");
      }
    } catch (error) {
      console.error("Error create order:", error);
    }
  };
  console.log(errors);

  const handleCityChange = async (selectedCity) => {
    try {
      const res = {
        orderShipping: {
          city: selectedCity,
        },
        medias: listMedia,
        userId: "1",
      };
      console.log("request", res);
      const response = await OrderService.calculateShippingFee(res, true);
      console.log("respone", response);
      setShippingFee(response.data.data);
    } catch (error) {
      console.error("Error calculating shipping fee:", error);
    }
  };

  const checkExpressMethod = () => {
    console.log("-------", listMedia);
    if (listMedia?.filter((media) => media.isRush).length === 0) {
      ToastUtil.showToastError(
        "Sản phẩm trong giỏ hàng không hỗ trợ giao hàng nhanh"
      );
      // setIsExpressDelivery(false);
      // setSelectedShippingMethod("Giao hàng tiêu chuẩn");
      return;
    }
    setIsExpressDelivery(true);
    setSelectedShippingMethod("Giao hàng nhanh");
  };

  return (
    <>
      {ToastUtil.initializeToastContainer()}
      <HeaderBar />
      <div className="pt-2 mx-10">
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 rounded-lg bg-[#209ed44e]"
            >
              <div className="text-center font-semibold text-xl mb-5">
                Thông tin giao hàng
              </div>
              <div className="flex items-center">
                <label className="min-w-[250px]" htmlFor="name">
                  Họ và tên:
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-text"
                  placeholder="Họ và tên"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Họ và tên là trường bắt buộc",
                    },
                  })}
                />
              </div>
              <div className="ml-[255px] text-[#d04242] mb-2">
                {errors?.name?.message}
              </div>
              <div className="flex items-center">
                <label className="min-w-[250px]" htmlFor="phone">
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Số điện thoại"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Số điện thoại là trường bắt buộc",
                    },
                    maxLength: {
                      value: 10,
                      message: "Số điện thoại có tối đa 10 chữ số",
                    },
                  })}
                />
              </div>
              <div className="ml-[255px] text-[#d04242] mb-2">
                {errors?.phone?.message}
              </div>

              <div className="flex items-center">
                <label className="min-w-[250px]" htmlFor="city">
                  Tỉnh/Thành phố:
                </label>
                <select
                  id="city"
                  name="city"
                  {...register("city", { required: true })}
                  onChange={(e) => {
                    handleCityChange(e.target.value);
                  }}
                >
                  <option value="An Giang">An Giang</option>
                  <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                  <option value="Bắc Giang">Bắc Giang</option>
                  <option value="Bắc Kạn">Bắc Kạn</option>
                  <option value="Bắc Ninh">Bắc Ninh</option>
                  <option value="Bến Tre">Bến Tre</option>
                  <option value="Bình Định">Bình Định</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Bình Phước">Bình Phước</option>
                  <option value="Bình Thuận">Bình Thuận</option>
                  <option value="Cà Mau">Cà Mau</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Cao Bằng">Cao Bằng</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Đắk Lắk">Đắk Lắk</option>
                  <option value="Đắk Nông">Đắk Nông</option>
                  <option value="Điện Biên">Điện Biên</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Đồng Tháp">Đồng Tháp</option>
                  <option value="Gia Lai">Gia Lai</option>
                  <option value="Hà Giang">Hà Giang</option>
                  <option value="Hà Nam">Hà Nam</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hà Tĩnh">Hà Tĩnh</option>
                  <option value="Hải Dương">Hải Dương</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Hậu Giang">Hậu Giang</option>
                  <option value="Hòa Bình">Hòa Bình</option>
                  <option value="Hưng Yên">Hưng Yên</option>
                  <option value="Khánh Hòa">Khánh Hòa</option>
                  <option value="Kiên Giang">Kiên Giang</option>
                  <option value="Kon Tum">Kon Tum</option>
                  <option value="Lai Châu">Lai Châu</option>
                  <option value="Lâm Đồng">Lâm Đồng</option>
                  <option value="Lạng Sơn">Lạng Sơn</option>
                  <option value="Lào Cai">Lào Cai</option>
                  <option value="Long An">Long An</option>
                  <option value="Nam Định">Nam Định</option>
                  <option value="Nghệ An">Nghệ An</option>
                  <option value="Ninh Bình">Ninh Bình</option>
                  <option value="Ninh Thuận">Ninh Thuận</option>
                  <option value="Phú Thọ">Phú Thọ</option>
                  <option value="Phú Yên">Phú Yên</option>
                  <option value="Quảng Bình">Quảng Bình</option>
                  <option value="Quảng Nam">Quảng Nam</option>
                  <option value="Quảng Ngãi">Quảng Ngãi</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Quảng Trị">Quảng Trị</option>
                  <option value="Sóc Trăng">Sóc Trăng</option>
                  <option value="Sơn La">Sơn La</option>
                  <option value="Tây Ninh">Tây Ninh</option>
                  <option value="Thái Bình">Thái Bình</option>
                  <option value="Thái Nguyên">Thái Nguyên</option>
                  <option value="Thanh Hóa">Thanh Hóa</option>
                  <option value="Thừa Thiên-Huế">Thừa Thiên-Huế</option>
                  <option value="Tiền Giang">Tiền Giang</option>
                  <option value="Trà Vinh">Trà Vinh</option>
                  <option value="Tuyên Quang">Tuyên Quang</option>
                  <option value="Vĩnh Long">Vĩnh Long</option>
                  <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                  <option value="Yên Bái">Yên Bái</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="min-w-[250px]" htmlFor="address">
                  Địa chỉ:
                </label>
                <textarea
                  placeholder="Địa chỉ"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Địa chỉ là trường bắt buộc",
                    },
                  })}
                />
              </div>
              <div className="ml-[255px] text-[#d04242] mb-2">
                {errors?.address?.message}
              </div>
              <div className="flex items-center">
                <label className="min-w-[250px]" htmlFor="shippingInstruction">
                  Chỉ dẫn giao hàng:
                </label>
                <textarea
                  placeholder="Chỉ dẫn giao hàng"
                  {...register("shippingInstruction", { maxLength: 255 })}
                />
              </div>

              <div className="flex items-center mt-2">
                <label className="min-w-[250px]">Phương thức giao hàng:</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shippingMethod"
                    id="standardDelivery"
                    value="Giao hàng tiêu chuẩn"
                    {...register("shippingMethod")}
                    onClick={() => {
                      setIsExpressDelivery(false);
                      setSelectedShippingMethod("Giao hàng tiêu chuẩn");
                    }}
                  />
                  <label className="min-w-[250px]" htmlFor="standardDelivery">
                    Giao hàng tiêu chuẩn
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shippingMethod"
                    id="expressDelivery"
                    value="Giao hàng nhanh"
                    {...register("shippingMethod")}
                    onClick={() => {
                      checkExpressMethod();
                    }}
                  />
                  <label className="min-w-[250px]" htmlFor="expressDelivery">
                    Giao hàng nhanh
                  </label>
                </div>
              </div>
              {isExpressDelivery && (
                <>
                  <div className="flex items-center">
                    <label className="min-w-[250px]" htmlFor="shipmentDetails">
                      Thông tin giao hàng nhanh:
                    </label>
                    <textarea
                      placeholder="Thông tin giao hàng nhanh"
                      {...register("shipmentDetails", { maxLength: 255 })}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="min-w-[250px]"
                      htmlFor="deliveryInstruction"
                    >
                      Chỉ dẫn giao hàng nhanh:
                    </label>
                    <textarea
                      placeholder="Chỉ dẫn giao hàng nhanh"
                      {...register("deliveryInstruction", {})}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="min-w-[250px]" htmlFor="deliveryTime">
                      Thời gian nhận hàng:
                    </label>
                    <input
                      type="datetime-local"
                      id="deliveryTime"
                      placeholder="Thời gian nhận hàng"
                      {...register("deliveryTime", {})}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end mt-10">
                <input type="submit" value="Đặt hàng" />
              </div>
            </form>
          </div>
          <div className="col-span-4">
            <table className="table table-warning table-striped max-w-[500px] float-right">
              <thead>
                <tr>
                  <th>Thông tin</th>
                  <th>Nội dung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tổng giá cả </td>
                  <td>{formatNumber(subtotal)}đ</td>
                </tr>
                <tr>
                  <td>VAT(10%)</td>
                  <td>{formatNumber((subtotal * 10) / 100)}đ</td>
                </tr>
                <tr>
                  <td>Phí vận chuyển</td>
                  <td>{shippingFee}đ</td>
                </tr>
                <tr>
                  <td>Tổng tiền</td>
                  <td>{formatNumber(subtotal * 1.1 + shippingFee)}đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
