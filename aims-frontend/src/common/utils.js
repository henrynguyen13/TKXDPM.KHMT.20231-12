import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
