package controller;

import entity.cart.Cart;
import entity.cart.CartMedia;
import entity.media.Media;

import java.util.List;


/**
 * This class is the base controller for our AIMS project.
 *
 * @author nguyenlm
 */
public class BaseController {

    /**
     * The method checks whether the Media in Cart, if it were in, we will return
     * the CartMedia else return null.
     *
     * @param media media object
     * @return CartMedia or null
     */
    //Comment: Data coupling -> truy cập tới đối tượng Media

    //Comment: Functional  Cohesion: checkMediaInCart(Media media) và getListCartMedia() đều liên quan đến
    // việc quản lý giỏ hàng (Cart) và các phương thức cung cấp thông tin về các mặt hàng trong giỏ hàng.
    // Cả hai phương thức này đều liên quan chức năng của việc quản lý giỏ hàng.
    public CartMedia checkMediaInCart(Media media) {
        return Cart.getCart().checkMediaInCart(media);
    }

    /**
     * This method gets the list of items in cart.
     *
     * @return List[CartMedia]
     */
    public List getListCartMedia() {
        return Cart.getCart().getListMedia();
    }
}
