package controller;

import entity.cart.Cart;
import entity.cart.CartMedia;
import entity.invoice.Invoice;
import entity.media.Media;
import entity.order.Order;
import entity.order.OrderMedia;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Random;
import java.util.logging.Logger;

/**
 * This class controls the flow of place order usecase in our AIMS project
 *
 * @author nguyenlm
 */

/*Procedural cohesion
  Các phương thức trong lớp được nhóm lại với nhau vì chúng được thiết kế để hoạt động cùng nhau nhằm hoàn thành một nhiệm vụ cụ thể: đặt hàng.
  Giải pháp: Tạo các lớp dịch vụ riêng biệt cho từng chức năng chính ví dụ OrderController, InvoiceController, DeliveryInfoController
*/

/*
    // Lớp này vi phạm nguyên lý SRP trong SOLID
    Lớp PlaceOrderController thực hiện nhiều chức năng khác nhau như kiểm tra sự có sẵn của sản phẩm,
    tạo đơn hàng, tạo hóa đơn, xử lý thông tin giao hàng, và kiểm tra và xử lý dữ liệu khác.
    Điều này có thể dẫn đến vi phạm nguyên tắc SRP, vì một lớp nên chỉ có một lý do để thay đổi.
    Nếu có sự thay đổi trong quy trình đặt hàng, đơn hàng, hoặc hóa đơn, có thể ảnh hưởng đến lớp này.
    Giải pháp: Tách các chức năng khác nhau thành các lớp riêng biệt

    // Lớp này vi phạm nguyên lý DIP trong SOLID
    Lớp này có một số phương thức trực tiếp gọi các phương thức của lớp cụ thể khác như Cart và Order.
    Điều này làm tăng sự ràng buộc giữa các lớp cụ thể và làm giảm khả năng tái sử dụng.
    Giải pháp: Định nghĩa một giao diện hoặc lớp trừu tượng cho các thành phần bên trong PlaceOrderController,
    chẳng hạn như Cart và OrderProcessor. Sau đó, lớp PlaceOrderController chỉ phụ thuộc vào các interface
    hoặc abstract class này thay vì các lớp cụ thể.
 */
public class PlaceOrderController extends BaseController {

    /**
     * Just for logging purpose
     */
    private static Logger LOGGER = utils.Utils.getLogger(PlaceOrderController.class.getName());

    /**
     * This method checks the avalibility of product when user click PlaceOrder
     * button
     *
     * @throws SQLException
     */
    public void placeOrder() throws SQLException {
        Cart.getCart().checkAvailabilityOfProduct();
    }

    /**
     * This method creates the new Order based on the Cart
     *
     * @return Order
     * @throws SQLException
     */

    //Content coupling : Can thiệp trực tiếp vào biến của class Order
    public Order createOrder() throws SQLException {
        Order order = new Order();
        for (Object object : Cart.getCart().getListMedia()) {
            CartMedia cartMedia = (CartMedia) object;
            OrderMedia orderMedia = new OrderMedia(cartMedia.getMedia(),
                    cartMedia.getQuantity(),
                    cartMedia.getPrice());
            order.getlstOrderMedia().add(orderMedia);
        }
        return order;
    }

    /**
     * This method creates the new Invoice based on order
     *
     * @param order
     * @return Invoice
     */

    //Data coupling: Truyền đối tượng Order làm tham số và sử dụng
    public Invoice createInvoice(Order order) {
        return new Invoice(order);
    }

    /**
     * This method takes responsibility for processing the shipping info from user
     *
     * @param info
     * @throws InterruptedException
     * @throws IOException
     */

    //Comment: Procedural Cohesion:
    // Phương thức validateDeliveryInfo và processDeliveryInfo đều liên quan đến việc xác nhận thông tin giao hàng
    //với validateDeliveryInfo chịu trách nhiệm kiểm tra thông tin và processDeliveryInfo xử lý thông tin đó.
    public void processDeliveryInfo(HashMap info) throws InterruptedException, IOException {
        LOGGER.info("Process Delivery Info");
        LOGGER.info(info.toString());
        validateDeliveryInfo(info);
    }

    /**
     * The method validates the info
     *
     * @param info
     * @throws InterruptedException
     * @throws IOException
     */
    public void validateDeliveryInfo(HashMap<String, String> info) throws InterruptedException, IOException {

    }


    /**
     * @param phoneNumber
     * @return boolean
     */

    //Comment: Functional Cohesion:
    // Các phương thức validatePhoneNumber, validateName, validateAddress đều thực hiện các nhiệm vụ kiểm tra dữ liệu
    // liên quan đến số điện thoại, tên, địa chỉ và trả về kết quả kiểm tra tương ứng.
    public boolean validatePhoneNumber(String phoneNumber) {
        // check the phoneNumber has 10 digits
        if (phoneNumber.length() != 10)
            return false;
        if (Character.compare(phoneNumber.charAt(0), '0') != 0)
            return false;
        // check the phoneNumber contains only number
        try {
            Integer.parseInt(phoneNumber);
        } catch (NumberFormatException e) {
            return false;
        }

        return true;
    }


    /**
     * @param name
     * @return boolean
     */
    public boolean validateName(String name) {
        // Check name is not null
        if (name == null)
            return false;
        // Check if contain leter space only
        if (name.trim().length() == 0)
            return false;
        // Check if contain only leter and space
        if (name.matches("^[a-zA-Z ]*$") == false)
            return false;
        return true;
    }


    /**
     * @param address
     * @return boolean
     */
    public boolean validateAddress(String address) {
        // Check address is not null
        if (address == null)
            return false;
        // Check if contain leter space only
        if (address.trim().length() == 0)
            return false;
        // Check if contain only leter and space
        if (address.matches("^[a-zA-Z ]*$") == false)
            return false;
        return true;
    }

    /**
     * This method calculates the shipping fees of order
     *
     * @param order
     * @return shippingFee
     */

    //Data coupling: Truyền đối tượng Order làm tham số và sử dụng
    public int calculateShippingFee(Order order) {
        Random rand = new Random();
        int fees = (int) (((rand.nextFloat() * 10) / 100) * order.getAmount());
        LOGGER.info("Order Amount: " + order.getAmount() + " -- Shipping Fees: " + fees);
        return fees;
    }

    /**
     * This method get product available place rush order media
     *
     * @param order
     * @return media
     * @throws SQLException
     */

    //Stamp coupling: Truyền cả đối tượng Order vào làm tham số tuy nhiên không truy cập hết các phương thức
    public Media getProductAvailablePlaceRush(Order order) throws SQLException {
        Media media = new Media();
        HashMap<String, String> deliveryInfo = order.getDeliveryInfo();
        validateAddressPlaceRushOrder(deliveryInfo.get("province"), deliveryInfo.get("address"));
        for (Object object : order.getlstOrderMedia()) {
            // CartMedia cartMedia = (CartMedia) object;
            validateMediaPlaceRushorder();
        }
        return media;
    }


    /**
     * @param province
     * @param address
     * @return boolean
     */
    public boolean validateAddressPlaceRushOrder(String province, String address) {
        if (!validateAddress(address))
            return false;
        if (!province.equals("Hà Nội"))
            return false;
        return true;
    }


    /**
     * @return boolean
     */
    public boolean validateMediaPlaceRushorder() {
        if (Media.getIsSupportedPlaceRushOrder())
            return true;
        return false;
    }
}
