import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

class ToastUtil {
  static showToastSuccess(message) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      containerId: "toast",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: false,
      theme: "colored",
    });
  }

  static showToastError(message) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      containerId: "toast",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: false,
      theme: "colored",
    });
  }

  static showToastWarning(message) {
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      containerId: "toast",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: false,
      theme: "colored",
    });
  }

  static initializeToastContainer() {
    return <ToastContainer containerId="toast" autoClose={3000} />;
  }
}

export default ToastUtil;

export const formatNumber = (number) => {
  if (typeof number === "number") {
    return number.toLocaleString("vi-VN");
  }
  return "";
};

export const formatDateTime = (inputDatetime) => {
  const formattedDateTime = moment(inputDatetime).format('HH:mm DD/MM/YYYY');
  return formattedDateTime;
};

export const convertDateTimeFormat = (inputDateTime) => {
  const year = inputDateTime.slice(0, 4);
  const month = inputDateTime.slice(4, 6);
  const day = inputDateTime.slice(6, 8);
  const hours = inputDateTime.slice(8, 10);
  const minutes = inputDateTime.slice(10, 12);

  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
  return formattedDateTime;
};