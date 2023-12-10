package entity.cart;

import common.exception.MediaNotAvailableException;
import entity.media.Media;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

// Functional Cohesion
// Các chức năng có liên quan đến Cart
public class Cart {

    private static Cart cartInstance;
    private List<CartMedia> lstCartMedia;


    private Cart() {
        lstCartMedia = new ArrayList<>();
    }

    /**
     * @return Cart
     */
    public static Cart getCart() {
        if (cartInstance == null) cartInstance = new Cart();
        return cartInstance;
    }

    /**
     * @param cm
     */
    // Data coupling - Truyền đối tượng CartMedia và sử dụng trong phương thức add
    public void addCartMedia(CartMedia cm) {
        lstCartMedia.add(cm);
    }


    /**
     * @param cm
     */
    // Data coupling - Truyền đối tượng CartMedia và sử dụng trong phương thức remove
    public void removeCartMedia(CartMedia cm) {
        lstCartMedia.remove(cm);
    }


    /**
     * @return List
     */
    public List getListMedia() {
        return lstCartMedia;
    }

    public void emptyCart() {
        lstCartMedia.clear();
    }


    /**
     * @return int
     */
    public int getTotalMedia() {
        int total = 0;
        for (Object obj : lstCartMedia) {
            CartMedia cm = (CartMedia) obj;
            total += cm.getQuantity();
        }
        return total;
    }


    /**
     * @return int
     */
    public int calSubtotal() {
        int total = 0;
        for (Object obj : lstCartMedia) {
            CartMedia cm = (CartMedia) obj;
            total += cm.getPrice() * cm.getQuantity();
        }
        return total;
    }


    /**
     * @throws SQLException
     */
    public void checkAvailabilityOfProduct() throws SQLException {
        boolean allAvai = true;
        for (Object object : lstCartMedia) {
            CartMedia cartMedia = (CartMedia) object;
            int requiredQuantity = cartMedia.getQuantity();
            int availQuantity = cartMedia.getMedia().getQuantity();
            if (requiredQuantity > availQuantity) allAvai = false;
        }
        if (!allAvai) throw new MediaNotAvailableException("Some media not available");
    }


    /**
     * @param media
     * @return CartMedia
     */
    // Stamp coupling - Truyền cả đối tượng CartMedia nhưng phương thức chỉ truy cập thuộc tính id
    public CartMedia checkMediaInCart(Media media) {
        for (CartMedia cartMedia : lstCartMedia) {
            if (cartMedia.getMedia().getId() == media.getId()) return cartMedia;
        }
        return null;
    }

}
