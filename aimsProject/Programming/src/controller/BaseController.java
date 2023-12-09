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

/*Communicational cohesion
*Cả hai phương thức đều truy cập và thao tác cùng một cấu trúc dữ liệu: Cả hai hàm đều dựa vào đối tượng Cart và dữ liệu bên trong của nó, đặc biệt là xử lý danh sách các đối tượng CartMedia trong Giỏ hàng.
*Chúng thực hiện các nhiệm vụ khác nhau: Trong khi checkMediaInCartkiểm tra xem một đối tượng Media cụ thể có tồn tại trong Cart, getListCartMedia truy xuất toàn bộ danh sách các đối tượng CartMedia."
*Giải pháp: Tạo một lớp riêng biệt dành riêng cho việc quản lý Cart (CartController)
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
