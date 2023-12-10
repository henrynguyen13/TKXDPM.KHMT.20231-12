package entity.order;

import utils.Configs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

// Functional Cohesion
// Các chức năng có liên quan đến Order
public class Order {

    private int shippingFees;
    private List lstOrderMedia;
    private HashMap<String, String> deliveryInfo;

    public Order() {
        this.lstOrderMedia = new ArrayList<>();
    }

    public Order(List lstOrderMedia) {
        this.lstOrderMedia = lstOrderMedia;
    }


    /**
     * @param om
     */
    // Comment: Data coupling, Sử dụng đối tượng OrderMedia để làm tham số
    public void addOrderMedia(OrderMedia om) {
        this.lstOrderMedia.add(om);
    }


    /**
     * @param om
     */
    // Comment: Data coupling, Sử dụng đối tượng OrderMedia để làm tham số
    public void removeOrderMedia(OrderMedia om) {
        this.lstOrderMedia.remove(om);
    }


    /**
     * @return List
     */
    public List getlstOrderMedia() {
        return this.lstOrderMedia;
    }


    /**
     * @param lstOrderMedia
     */
    public void setlstOrderMedia(List lstOrderMedia) {
        this.lstOrderMedia = lstOrderMedia;
    }

    /**
     * @return int
     */
    public int getShippingFees() {
        return shippingFees;
    }

    /**
     * @param shippingFees
     */
    public void setShippingFees(int shippingFees) {
        this.shippingFees = shippingFees;
    }

    /**
     * @return HashMap
     */
    public HashMap getDeliveryInfo() {
        return deliveryInfo;
    }


    /**
     * @param deliveryInfo
     */
    public void setDeliveryInfo(HashMap deliveryInfo) {
        this.deliveryInfo = deliveryInfo;
    }


    /**
     * @return int
     */
    public int getAmount() {
        double amount = 0;
        for (Object object : lstOrderMedia) {
            OrderMedia om = (OrderMedia) object;
            amount += om.getPrice();
        }
        return (int) (amount + (Configs.PERCENT_VAT / 100) * amount);
    }

}
