package controller;

import entity.cart.Cart;

import java.sql.SQLException;

/**
 * This class controls the flow of events when users view the Cart
 *
 * @author nguyenlm
 */

/*ViewCartController
* Procedural cohesion
*Thực hiện lần lượt các tác vụ khi người dùng bấm vào giỏ hàng
* */
public class ViewCartController extends BaseController {

    /**
     * This method checks the available products in Cart
     *
     * @throws SQLException
     */
    public void checkAvailabilityOfProduct() throws SQLException {
        Cart.getCart().checkAvailabilityOfProduct();
    }

    /**
     * This method calculates the cart subtotal
     *
     * @return subtotal
     */
    public int getCartSubtotal() {
        int subtotal = Cart.getCart().calSubtotal();
        return subtotal;
    }

}
